/**
 * @fileoverview Jest setup file for testing environment
 */

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 0,
    key: jest.fn()
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 0,
    key: jest.fn()
};
global.sessionStorage = sessionStorageMock;

// Mock document.createElement
const originalCreateElement = document.createElement;
document.createElement = function(tag) {
    const element = originalCreateElement.call(document, tag);
    
    // Add common properties and methods
    if (tag === 'video' || tag === 'canvas') {
        element.width = 640;
        element.height = 480;
        element.getContext = jest.fn();
        element.toDataURL = jest.fn();
    }
    
    return element;
};

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0))
    })
);

// Mock WebSocket
class WebSocket {
    constructor(url) {
        this.url = url;
        this.readyState = 0;
        this.onopen = null;
        this.onmessage = null;
        this.onerror = null;
        this.onclose = null;
    }
    
    send(data) {
        // Mock send implementation
    }
    
    close() {
        // Mock close implementation
    }
}
global.WebSocket = WebSocket;

// Mock face-api.js
jest.mock('face-api.js', () => ({
    nets: {
        ssdMobilenetv1: {
            loadFromUri: jest.fn(),
            detectAllFaces: jest.fn()
        },
        faceLandmark68Net: {
            loadFromUri: jest.fn(),
            detectLandmarks: jest.fn()
        },
        faceRecognitionNet: {
            loadFromUri: jest.fn(),
            computeFaceDescriptor: jest.fn()
        }
    },
    detectAllFaces: jest.fn(),
    detectLandmarks: jest.fn(),
    computeFaceDescriptor: jest.fn()
}));

// Reset all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    sessionStorageMock.clear();
});

// Clean up after each test
afterEach(() => {
    jest.resetAllMocks();
}); 