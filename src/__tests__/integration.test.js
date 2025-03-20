/**
 * @fileoverview Integration tests for the Smart Mirror System
 */

const FaceRecognitionManager = require('../ui/public/js/face-recognition/face-recognition');
const UserProfilesManager = require('../ui/public/js/face-recognition/user-profiles');

describe('Smart Mirror Integration Tests', () => {
    let faceManager;
    let userManager;
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
        
        // Initialize managers
        faceManager = new FaceRecognitionManager({
            videoElement: mockVideoElement,
            canvasElement: mockCanvas,
            modelPath: '/models/',
            detectionConfidence: 0.5,
            processingInterval: 1000
        });

        userManager = new UserProfilesManager(faceManager);
    });

    test('should recognize user and load their profile', async () => {
        // Create a test user profile
        const testUser = {
            name: 'Test User',
            preferences: {
                theme: 'dark',
                widgets: ['weather', 'news']
            }
        };

        await userManager.createProfile(testUser);

        // Mock face detection
        const mockFaceDescriptor = new Float32Array(128);
        jest.spyOn(faceManager, 'detectFaces').mockResolvedValue([{
            detection: { box: { x: 0, y: 0, width: 100, height: 100 } },
            landmarks: [],
            descriptor: mockFaceDescriptor
        }]);

        // Mock user recognition
        jest.spyOn(faceManager, 'recognizeUser').mockResolvedValue({
            id: testUser.name,
            name: testUser.name,
            faceDescriptor: mockFaceDescriptor
        });

        // Start face recognition processing
        await faceManager.startProcessing();
        
        // Wait for recognition
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify profile was loaded
        const currentProfile = await userManager.getCurrentProfile();
        expect(currentProfile).toBeDefined();
        expect(currentProfile.name).toBe(testUser.name);
    });

    test('should handle multiple users', async () => {
        // Create multiple test users
        const users = [
            { name: 'User 1', preferences: { theme: 'dark' } },
            { name: 'User 2', preferences: { theme: 'light' } }
        ];

        for (const user of users) {
            await userManager.createProfile(user);
        }

        // Mock face detection for first user
        const mockFaceDescriptor1 = new Float32Array(128);
        jest.spyOn(faceManager, 'detectFaces').mockResolvedValue([{
            detection: { box: { x: 0, y: 0, width: 100, height: 100 } },
            landmarks: [],
            descriptor: mockFaceDescriptor1
        }]);

        // Mock user recognition for first user
        jest.spyOn(faceManager, 'recognizeUser').mockResolvedValue({
            id: users[0].name,
            name: users[0].name,
            faceDescriptor: mockFaceDescriptor1
        });

        // Start processing
        await faceManager.startProcessing();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify first user's profile
        let currentProfile = await userManager.getCurrentProfile();
        expect(currentProfile.name).toBe(users[0].name);

        // Mock face detection for second user
        const mockFaceDescriptor2 = new Float32Array(128);
        jest.spyOn(faceManager, 'detectFaces').mockResolvedValue([{
            detection: { box: { x: 0, y: 0, width: 100, height: 100 } },
            landmarks: [],
            descriptor: mockFaceDescriptor2
        }]);

        // Mock user recognition for second user
        jest.spyOn(faceManager, 'recognizeUser').mockResolvedValue({
            id: users[1].name,
            name: users[1].name,
            faceDescriptor: mockFaceDescriptor2
        });

        // Wait for recognition
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify second user's profile
        currentProfile = await userManager.getCurrentProfile();
        expect(currentProfile.name).toBe(users[1].name);
    });

    test('should handle recognition errors gracefully', async () => {
        // Mock face detection error
        jest.spyOn(faceManager, 'detectFaces').mockRejectedValue(new Error('Detection failed'));

        // Start processing
        await faceManager.startProcessing();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify no profile is loaded
        const currentProfile = await userManager.getCurrentProfile();
        expect(currentProfile).toBeNull();
    });

    test('should update user preferences and reflect changes', async () => {
        // Create test user
        const testUser = {
            name: 'Test User',
            preferences: {
                theme: 'dark',
                widgets: ['weather']
            }
        };

        await userManager.createProfile(testUser);

        // Mock face recognition
        const mockFaceDescriptor = new Float32Array(128);
        jest.spyOn(faceManager, 'detectFaces').mockResolvedValue([{
            detection: { box: { x: 0, y: 0, width: 100, height: 100 } },
            landmarks: [],
            descriptor: mockFaceDescriptor
        }]);

        jest.spyOn(faceManager, 'recognizeUser').mockResolvedValue({
            id: testUser.name,
            name: testUser.name,
            faceDescriptor: mockFaceDescriptor
        });

        // Start processing
        await faceManager.startProcessing();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update user preferences
        const updatedPreferences = {
            theme: 'light',
            widgets: ['weather', 'news']
        };

        await userManager.updateProfile({
            name: testUser.name,
            preferences: updatedPreferences
        });

        // Verify updated preferences
        const currentProfile = await userManager.getCurrentProfile();
        expect(currentProfile.preferences.theme).toBe('light');
        expect(currentProfile.preferences.widgets).toContain('news');
    });
}); 