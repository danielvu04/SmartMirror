/**
 * @fileoverview Test suite for the UserProfilesManager class
 */

const UserProfilesManager = require('../ui/public/js/face-recognition/user-profiles');

describe('UserProfilesManager', () => {
    let userManager;
    let mockFaceRecognition;

    beforeEach(() => {
        // Create mock face recognition manager
        mockFaceRecognition = {
            addFaceDescriptor: jest.fn(),
            removeFaceDescriptor: jest.fn(),
            recognizeUser: jest.fn()
        };

        // Initialize user profiles manager
        userManager = new UserProfilesManager(mockFaceRecognition);
    });

    test('should initialize with correct storage key', () => {
        expect(userManager.storageKey).toBe('smartMirrorUserProfiles');
    });

    test('should create a new user profile', async () => {
        const profileData = {
            name: 'Test User',
            preferences: {
                theme: 'dark',
                widgets: ['weather', 'news']
            }
        };

        await userManager.createProfile(profileData);
        const profiles = await userManager.loadProfiles();
        
        expect(profiles).toHaveLength(1);
        expect(profiles[0].name).toBe('Test User');
    });

    test('should update an existing profile', async () => {
        const profileData = {
            name: 'Test User',
            preferences: {
                theme: 'dark',
                widgets: ['weather', 'news']
            }
        };

        await userManager.createProfile(profileData);
        
        const updatedData = {
            name: 'Test User',
            preferences: {
                theme: 'light',
                widgets: ['weather', 'news', 'calendar']
            }
        };

        await userManager.updateProfile(updatedData);
        const profiles = await userManager.loadProfiles();
        
        expect(profiles[0].preferences.theme).toBe('light');
        expect(profiles[0].preferences.widgets).toContain('calendar');
    });

    test('should delete a profile', async () => {
        const profileData = {
            name: 'Test User',
            preferences: {}
        };

        await userManager.createProfile(profileData);
        await userManager.deleteProfile('Test User');
        
        const profiles = await userManager.loadProfiles();
        expect(profiles).toHaveLength(0);
    });

    test('should handle face recognition events', async () => {
        const mockUser = {
            id: 'test-user',
            name: 'Test User',
            faceDescriptor: new Float32Array(128)
        };

        await userManager.createProfile(mockUser);
        await userManager.handleFaceRecognition(mockUser.faceDescriptor);

        expect(mockFaceRecognition.recognizeUser).toHaveBeenCalledWith(mockUser.faceDescriptor);
    });

    test('should respect maximum profile limit', async () => {
        const maxProfiles = userManager.maxProfiles;
        
        for (let i = 0; i < maxProfiles + 1; i++) {
            await userManager.createProfile({
                name: `User ${i}`,
                preferences: {}
            });
        }

        const profiles = await userManager.loadProfiles();
        expect(profiles.length).toBeLessThanOrEqual(maxProfiles);
    });

    test('should handle storage errors gracefully', async () => {
        // Mock localStorage error
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = jest.fn(() => {
            throw new Error('Storage error');
        });

        await expect(userManager.createProfile({ name: 'Test User' }))
            .rejects.toThrow('Storage error');

        localStorage.setItem = originalSetItem;
    });
}); 