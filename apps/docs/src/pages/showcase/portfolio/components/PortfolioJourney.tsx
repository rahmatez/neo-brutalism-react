import { useCallback, useEffect, useRef, useState } from 'react';
import type { TimelineEntry } from '../portfolio.types';
import { PORTFOLIO_JOURNEY_MARKER_URL } from '../portfolio-journey-marker';
import { ChevronLeftIcon, MenuIcon } from '../portfolio.icons';

const INITIAL_CENTER: [number, number] = [118, -2];
const INITIAL_ZOOM = 5;

interface PortfolioJourneyProps {
  timeline: TimelineEntry[];
  activeJourney: number;
  onActiveJourneyChange: (index: number) => void;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function PortfolioJourney({
  timeline,
  activeJourney,
  onActiveJourneyChange,
}: PortfolioJourneyProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('ol/Map').default | null>(null);
  const overlayRef = useRef<import('ol/Overlay').default | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const activeJourneyRef = useRef(activeJourney);
  const timelineRef = useRef(timeline);
  const [timelineOpen, setTimelineOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  activeJourneyRef.current = activeJourney;
  timelineRef.current = timeline;

  const showPopup = useCallback((entry: TimelineEntry, coords?: number[]) => {
    const overlay = overlayRef.current;
    const popup = popupRef.current;
    if (!overlay || !popup) return;
    popup.innerHTML = `<h3>${escapeHtml(entry.popupTitle)}</h3><p>${escapeHtml(entry.popupDescription)}</p>`;
    void import('ol/proj').then(({ fromLonLat }) => {
      overlay.setPosition(coords ?? fromLonLat(entry.location));
    });
  }, []);

  const focusEntry = useCallback(
    (entry: TimelineEntry, animate: boolean) => {
      const map = mapInstanceRef.current;
      if (!map) return;
      void import('ol/proj').then(({ fromLonLat }) => {
        const coords = fromLonLat(entry.location);
        if (animate) {
          const view = map.getView();
          const current = view.getZoom() ?? INITIAL_ZOOM;
          view.animate({
            center: coords,
            zoom: Math.max(current, 8),
            duration: 800,
          });
        }
        showPopup(entry, coords);
      });
    },
    [showPopup],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const onResize = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setTimelineOpen(!mobile);
    };
    onResize();
    mediaQuery.addEventListener('change', onResize);
    return () => mediaQuery.removeEventListener('change', onResize);
  }, []);

  useEffect(() => {
    let disposed = false;

    async function initMap() {
      if (!mapRef.current) return;

      const [
        { default: OlMap },
        { default: Overlay },
        { default: View },
        { default: Feature },
        { default: Point },
        { default: TileLayer },
        { default: VectorLayer },
        { default: VectorSource },
        { default: XYZ },
        { fromLonLat },
        { Icon, Style },
      ] = await Promise.all([
        import('ol/Map'),
        import('ol/Overlay'),
        import('ol/View'),
        import('ol/Feature'),
        import('ol/geom/Point'),
        import('ol/layer/Tile'),
        import('ol/layer/Vector'),
        import('ol/source/Vector'),
        import('ol/source/XYZ'),
        import('ol/proj'),
        import('ol/style'),
        import('ol/ol.css'),
      ]);

      if (disposed || !mapRef.current) return;

      const popupEl = document.createElement('div');
      popupEl.className = 'portfolio-map-popup';
      popupRef.current = popupEl;

      const overlay = new Overlay({
        element: popupEl,
        positioning: 'bottom-center',
        offset: [0, -40],
        stopEvent: false,
      });
      overlayRef.current = overlay;

      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: PORTFOLIO_JOURNEY_MARKER_URL,
          scale: 1,
        }),
      });

      const entries = timelineRef.current;
      const features = entries.map((entry) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(entry.location)),
        });
        feature.set('entry', entry);
        feature.setStyle(markerStyle);
        return feature;
      });

      const map = new OlMap({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
              attributions: '© OpenStreetMap contributors © CARTO',
            }),
          }),
          new VectorLayer({
            source: new VectorSource({ features, wrapX: false }),
            zIndex: 10,
          }),
        ],
        controls: [],
        view: new View({
          center: fromLonLat(INITIAL_CENTER),
          zoom: INITIAL_ZOOM,
          maxZoom: 18,
          minZoom: 2,
        }),
      });

      map.addOverlay(overlay);
      mapInstanceRef.current = map;

      map.on('pointermove', (event) => {
        if (event.dragging) return;
        const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
        const target = map.getTargetElement();
        if (target) {
          target.style.cursor = feature ? 'pointer' : '';
        }
        if (feature) {
          showPopup(feature.get('entry') as TimelineEntry);
          return;
        }
        const activeIdx = activeJourneyRef.current;
        const currentTimeline = timelineRef.current;
        if (activeIdx >= 0 && activeIdx < currentTimeline.length) {
          showPopup(currentTimeline[activeIdx]);
        } else {
          overlay.setPosition(undefined);
        }
      });

      map.on('singleclick', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
        if (!feature) return;
        const entry = feature.get('entry') as TimelineEntry;
        const index = timelineRef.current.findIndex((item) => item.id === entry.id);
        if (index >= 0) {
          onActiveJourneyChange(index);
          focusEntry(entry, true);
          if (window.matchMedia('(max-width: 767px)').matches) {
            setTimelineOpen(false);
          }
        }
      });
    }

    initMap().catch(() => {
      /* static fallback */
    });

    return () => {
      disposed = true;
      mapInstanceRef.current?.setTarget(undefined);
      mapInstanceRef.current?.dispose();
      mapInstanceRef.current = null;
      overlayRef.current = null;
      popupRef.current = null;
    };
  }, [focusEntry, onActiveJourneyChange, showPopup]);

  useEffect(() => {
    if (activeJourney < 0 || activeJourney >= timeline.length) {
      overlayRef.current?.setPosition(undefined);
      return;
    }
    focusEntry(timeline[activeJourney], false);
  }, [activeJourney, focusEntry, timeline]);

  const zoom = (direction: 'in' | 'out') => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const view = map.getView();
    const current = view.getZoom() ?? INITIAL_ZOOM;
    const target = direction === 'in' ? current + 1 : current - 1;
    const min = view.getMinZoom() ?? 2;
    const max = view.getMaxZoom() ?? 18;
    view.animate({
      zoom: Math.max(min, Math.min(target, max)),
      duration: 250,
    });
  };

  const resetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    void import('ol/proj').then(({ fromLonLat }) => {
      map.getView().animate({
        center: fromLonLat(INITIAL_CENTER),
        zoom: INITIAL_ZOOM,
        duration: 800,
      });
      overlayRef.current?.setPosition(undefined);
      onActiveJourneyChange(-1);
    });
  };

  const focusTimelineEntry = (index: number) => {
    onActiveJourneyChange(index);
    focusEntry(timeline[index], true);
    if (isMobile) setTimelineOpen(false);
  };

  return (
    <section
      id="journey"
      className="portfolio-grid-section relative scroll-mt-6 bg-white p-2 py-8 sm:p-4 sm:py-12 md:p-6 md:py-16 lg:p-8"
    >
      <div className="portfolio-grid-bg absolute inset-0" />
      <div className="portfolio-radial absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-full px-2 sm:px-5">
        <div className="portfolio-section-title mb-4 sm:mb-6 md:mb-10">
          <h2 className="text-center font-heading text-xl font-black text-black sm:text-2xl md:text-4xl lg:text-5xl">
            My Journey Through Time &amp; Space <span aria-hidden>🗺️</span>
          </h2>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-md border-2 border-black bg-[#dbeafe] shadow-[4px_4px_0px_0px_#000] sm:h-[500px] sm:border-4 sm:shadow-[8px_8px_0px_0px_#000] md:h-[600px] lg:h-[700px] xl:h-[750px]">
          <div ref={mapRef} className="portfolio-map-canvas absolute inset-0" />

          <aside
            className={`absolute top-0 left-0 z-20 flex h-full w-full transform flex-col overflow-hidden border-r-2 border-black bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out sm:w-[380px] sm:border-r-4 md:w-[420px] ${
              timelineOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-none items-center justify-between border-b-2 border-black bg-white p-3 sm:border-b-4 sm:p-4">
              <h3 className="text-lg font-black text-black sm:text-xl">Journey Timeline</h3>
              <button
                className="rounded bg-black p-2 text-white transition-colors hover:bg-gray-800 md:hidden"
                type="button"
                aria-label="Close timeline"
                onClick={() => setTimelineOpen(false)}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
            </div>

            <div className="portfolio-journey-timeline-scroll relative flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              {timeline.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  className={`relative w-full cursor-pointer rounded-md border-l-4 border-transparent py-3 pr-2 pl-10 text-left transition-colors duration-200 hover:bg-gray-100 sm:py-4 sm:pr-4 sm:pl-14 md:pl-16 ${
                    activeJourney === index ? 'bg-yellow-100' : ''
                  }`}
                  onClick={() => focusTimelineEntry(index)}
                >
                  <span className="absolute top-1/2 left-4 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-black sm:left-6" />
                  <span className="block text-base font-black sm:text-lg md:text-xl">{entry.title}</span>
                  <span className="block font-mono text-xs font-bold text-gray-600 sm:text-sm">
                    {entry.date}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed sm:mt-2 sm:text-base">
                    {entry.description}
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-xs font-medium text-gray-700 sm:mt-3 sm:text-sm">
                    <span aria-hidden>📍</span>
                    {entry.locationName}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {isMobile && !timelineOpen ? (
            <button
              className="absolute top-4 left-4 z-30 rounded-lg border-4 border-black bg-white p-3 text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              type="button"
              aria-label="Open timeline"
              onClick={() => setTimelineOpen(true)}
            >
              <MenuIcon className="size-6" />
            </button>
          ) : null}

          <div className="pointer-events-none absolute top-4 right-4 z-10 max-w-[200px] rounded-md border-2 border-black bg-white/80 p-2 px-3 text-xs font-medium text-black shadow-md backdrop-blur-sm sm:max-w-xs sm:text-sm md:right-20 lg:right-24">
            Click markers or timeline items to explore!
          </div>

          <div className="absolute right-2 bottom-2 z-10 flex flex-col gap-1.5 sm:right-4 sm:bottom-4 sm:gap-2 lg:top-4">
            <button className="portfolio-map-control" type="button" aria-label="Zoom in" onClick={() => zoom('in')}>
              +
            </button>
            <button className="portfolio-map-control" type="button" aria-label="Zoom out" onClick={() => zoom('out')}>
              −
            </button>
            <button className="portfolio-map-control text-base" type="button" aria-label="Reset map" onClick={resetView}>
              ⌂
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
