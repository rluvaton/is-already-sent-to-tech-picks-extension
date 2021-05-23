
export const queryTabs = (query: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> => new Promise((resolve) => chrome.tabs.query(query, resolve))

// From https://stackoverflow.com/a/22563123/5923666
export const isInChromeExtension = (): boolean => !!(window.chrome && chrome.runtime && chrome.runtime.id);
