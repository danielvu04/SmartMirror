import { UserProfilesManager } from '../UserProfilesManager';

describe('UserProfilesManager', () => {
    let userProfilesManager;

    beforeAll(() => {
        userProfilesManager = new UserProfilesManager();
    });

    test('should add a new user profile', () => {
        const userProfile = { id: 'user1', name: 'John Doe' };
        userProfilesManager.addUserProfile(userProfile);
        const retrievedProfile = userProfilesManager.getUserProfile('user1');
        expect(retrievedProfile).toEqual(userProfile);
    });

    test('should return null for non-existent user profile', () => {
        const retrievedProfile = userProfilesManager.getUserProfile('nonExistentUser');
        expect(retrievedProfile).toBeNull();
    });

    test('should update an existing user profile', () => {
        const userProfile = { id: 'user1', name: 'John Doe' };
        userProfilesManager.addUserProfile(userProfile);
        userProfilesManager.updateUserProfile('user1', { name: 'Jane Doe' });
        const updatedProfile = userProfilesManager.getUserProfile('user1');
        expect(updatedProfile.name).toBe('Jane Doe');
    });
}); 