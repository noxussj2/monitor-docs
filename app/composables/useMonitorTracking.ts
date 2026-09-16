interface MonitorTrackOptions {
  path?: string
}

interface TraceVistaApi {
  track: (eventName: string, data?: Record<string, unknown>, options?: MonitorTrackOptions) => Promise<boolean>
}

declare global {
  interface Window {
    TraceVista?: TraceVistaApi
  }
}

export const useMonitorTracking = () => {
  const trackEvent = (eventName: string, data: Record<string, unknown> = {}, options: MonitorTrackOptions = {}) => {
    if (!import.meta.client) {
      return Promise.resolve(false)
    }

    return window.TraceVista?.track(eventName, data, options) || Promise.resolve(false)
  }

  return {
    trackEvent
  }
}
