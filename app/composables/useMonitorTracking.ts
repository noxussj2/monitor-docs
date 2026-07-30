interface MonitorTrackOptions {
  path?: string
}

interface PulseWatchApi {
  track: (eventName: string, data?: Record<string, unknown>, options?: MonitorTrackOptions) => Promise<boolean>
}

declare global {
  interface Window {
    PulseWatch?: PulseWatchApi
  }
}

export const useMonitorTracking = () => {
  const trackEvent = (eventName: string, data: Record<string, unknown> = {}, options: MonitorTrackOptions = {}) => {
    if (!import.meta.client) {
      return Promise.resolve(false)
    }

    return window.PulseWatch?.track(eventName, data, options) || Promise.resolve(false)
  }

  return {
    trackEvent
  }
}
