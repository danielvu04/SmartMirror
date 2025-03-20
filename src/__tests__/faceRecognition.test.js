/**
 * @fileoverview Test suite for the FaceRecognitionManager class
 */

const FaceRecognitionManager = require('../ui/public/js/face-recognition/face-recognition');

describe('FaceRecognitionManager', () => {
    let faceManager;
    let mockVideoElement;
    let mockCanvas;

    beforeEach(() => {
        // Create mock video element
        mockVideoElement = document.createElement('video');
        mockVideoElement.width = 640;
        mockVideoElement.height = 480;
        
        // Create mock canvas
        mockCanvas = document.createElement('canvas');
        mockCanvas.width = 640;
        mockCanvas.height = 480;
        
        // Initialize face recognition manager
        faceManager = new FaceRecognitionManager({
            videoElement: mockVideoElement,
            canvasElement: mockCanvas,
            modelPath: '/models/',
            detectionConfidence: 0.5,
            processingInterval: 1000
        });
    });

    test('should initialize with correct options', () => {
        expect(faceManager.options).toBeDefined();
        expect(faceManager.options.detectionConfidence).toBe(0.5);
        expect(faceManager.options.processingInterval).toBe(1000);
    });

    test('should load models successfully', async () => {
        await faceManager.loadModels();
        expect(faceManager.modelsLoaded).toBe(true);
    });

    test('should start and stop processing', async () => {
        await faceManager.startProcessing();
        expect(faceManager.isProcessing).toBe(true);
        
        faceManager.stopProcessing();
        expect(faceManager.isProcessing).toBe(false);
    });

    test('should handle face detection', async () => {
        await faceManager.loadModels();
        const mockDetections = [
            {
                detection: { box: { x: 0, y: 0, width: 100, height: 100 } },
                landmarks: [],
                descriptor: new Float32Array(128)
            }
        ];
        
        // Mock face-api.detectAllFaces
        jest.spyOn(faceManager, 'detectFaces').mockResolvedValue(mockDetections);
        
        const result = await faceManager.detectFaces();
        expect(result).toEqual(mockDetections);
    });

    test('should handle user recognition', async () => {
        const mockUser = {
            id: 'test-user',
            name: 'Test User',
            faceDescriptor: new Float32Array(128)
        };
        
        await faceManager.addFaceDescriptor(mockUser.id, mockUser.faceDescriptor);
        const result = await faceManager.recognizeUser(mockUser.faceDescriptor);
        
        expect(result).toBeDefined();
        expect(result.id).toBe(mockUser.id);
    });

    test('should handle errors gracefully', async () => {
        // Mock a failed model loading
        jest.spyOn(faceManager, 'loadModels').mockRejectedValue(new Error('Model loading failed'));
        
        await expect(faceManager.loadModels()).rejects.toThrow('Model loading failed');
    });
}); 