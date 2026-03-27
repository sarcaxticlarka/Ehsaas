import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, User as UserIcon, Settings, Shield, Bell, ChevronRight, Camera, X, ArrowLeft } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { sendInstantTestNotification } from '../../utils/notifications';

export default function Profile() {
  const { user, logout, updateProfile, refreshUser } = useAuth();
  const router = useRouter();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [profession, setProfession] = useState(user?.profession || '');
  const [ageCategory, setAgeCategory] = useState(user?.ageCategory || '');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setBio(user?.bio || '');
    setGender(user?.gender || '');
    setProfession(user?.profession || '');
    setAgeCategory(user?.ageCategory || '');
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty.');
      return;
    }
    setUpdating(true);
    try {
      await updateProfile({ name, bio, gender, profession, ageCategory });
      setEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUpdating(true);
      try {
        // In a real prod app, you'd upload to Cloudinary/S3 here
        // For this local production-ready demo, we'll update the DB with the local URI or a placeholder
        await updateProfile({ profilePic: result.assets[0].uri });
        Alert.alert('Success', 'Profile picture updated.');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile picture.');
      } finally {
        setUpdating(false);
      }
    }
  };

  const MenuItem = ({ icon: Icon, title, value, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-100"
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-[#EFDECF]/30 rounded-full items-center justify-center mr-4">
          <Icon size={20} color="#1A1A1A" />
        </View>
        <View>
          <Text className="text-lg font-bold text-accent">{title}</Text>
          {value && <Text className="text-muted text-sm">{value}</Text>}
        </View>
      </View>
      <ChevronRight size={20} color="#9D9D9D" />
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      className="flex-1 bg-background" 
      contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header with Back Button */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-surface rounded-full items-center justify-center border border-gray-100 shadow-sm"
        >
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View className="items-center mb-10">
        <View className="relative">
          <View className="w-28 h-28 rounded-full border-4 border-primary p-1">
            <View className="w-full h-full rounded-full overflow-hidden bg-white/50 items-center justify-center">
              <Image
                source={{ uri: user?.profilePic || 'https://i.pravatar.cc/200?u=' + user?.email }}
                className="w-full h-full"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={pickImage}
            className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full border-2 border-white items-center justify-center"
          >
            <Camera size={14} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-3xl font-bold text-accent mt-4">{user?.name}</Text>
        <Text className="text-muted text-lg">{user?.email}</Text>
        {user?.bio ? (
          <Text className="text-accent text-center mt-2 px-4 italic">"{user.bio}"</Text>
        ) : (
          <TouchableOpacity onPress={() => setEditModalVisible(true)}>
            <Text className="text-[#276747] mt-2">Add bio</Text>
          </TouchableOpacity>
        )}

        {/* Demographics Badges */}
        <View className="flex-row items-center justify-center flex-wrap gap-2 mt-4 px-6">
          {user?.profession ? (
            <View className="bg-primary/50 px-4 py-1.5 rounded-full border border-primary">
              <Text className="text-[#276749] font-bold text-xs">{user.profession}</Text>
            </View>
          ) : null}
          {user?.ageCategory ? (
            <View className="bg-secondary/50 px-4 py-1.5 rounded-full border border-secondary">
              <Text className="text-[#9C4221] font-bold text-xs">{user.ageCategory}</Text>
            </View>
          ) : null}
          {user?.gender ? (
            <View className="bg-[#B2DFFF]/50 px-4 py-1.5 rounded-full border border-[#B2DFFF]">
              <Text className="text-[#005ea2] font-bold text-xs">{user.gender}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Stats Summary */}
      <View className="flex-row justify-between mb-10">
        <View className="bg-primary/30 flex-1 p-4 rounded-3xl mr-2 items-center">
          <Text className="text-2xl font-bold text-accent">{user?.streakCount || 0}</Text>
          <Text className="text-muted text-xs">Days Streak</Text>
        </View>
        <View className="bg-secondary/30 flex-1 p-4 rounded-3xl mx-2 items-center">
          <Text className="text-2xl font-bold text-accent">{user?.reflectionCount || 0}</Text>
          <Text className="text-muted text-xs">Reflections</Text>
        </View>
        <View className="bg-purple/30 flex-1 p-4 rounded-3xl ml-2 items-center">
          <Text className="text-2xl font-bold text-accent">{user?.badges?.length || 0}</Text>
          <Text className="text-muted text-xs">Badges</Text>
        </View>
      </View>

      {/* Badges Section */}
      {user?.badges?.length > 0 && (
        <View className="mb-10">
          <Text className="text-xl font-bold text-accent mb-4">Your Badges</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {user.badges.map((badge, i) => (
              <View key={i} className="items-center mr-6 bg-surface p-4 rounded-3xl border border-gray-100">
                <Text className="text-4xl mb-2">{badge.icon}</Text>
                <Text className="text-accent font-bold text-xs">{badge.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Menu Options */}
      <View className="bg-white rounded-4xl p-6 border border-gray-100 shadow-sm mb-10">
        <MenuItem
          icon={UserIcon}
          title="Personal Info"
          value="Edit your profile"
          onPress={() => setEditModalVisible(true)}
        />
        <MenuItem
          icon={Shield}
          title="Security"
          value="Password & Privacy"
          onPress={() => Alert.alert('Security', 'Security settings coming soon.')}
        />
        <MenuItem
          icon={Bell}
          title="Notifications"
          value="Daily reminders"
          onPress={() => sendInstantTestNotification()}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: logout, style: 'destructive' }
          ]);
        }}
        className="flex-row items-center justify-center bg-red-50 p-5 rounded-3xl border border-red-100"
      >
        <LogOut size={20} color="#F56565" />
        <Text className="ml-2 text-red-500 text-xl font-bold">Log Out</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-5xl p-8 max-h-[85%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-accent">Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} className="bg-gray-100 p-2 rounded-full">
                <X size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-muted mb-2 font-bold ml-1">Full Name</Text>
              <TextInput
                className="bg-gray-50 p-5 rounded-3xl mb-4 text-accent text-lg"
                value={name}
                onChangeText={setName}
                placeholder="Your Name"
              />

              <Text className="text-muted mb-2 font-bold ml-1">Profession</Text>
              <TextInput
                className="bg-gray-50 p-5 rounded-3xl mb-4 text-accent text-lg"
                value={profession}
                onChangeText={setProfession}
                placeholder="e.g. Designer, Software Engineer"
              />

              <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-muted mb-2 font-bold ml-1">Age Category</Text>
                  <TextInput
                    className="bg-gray-50 p-5 rounded-3xl text-accent text-lg"
                    value={ageCategory}
                    onChangeText={setAgeCategory}
                    placeholder="e.g. 25-34"
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-muted mb-2 font-bold ml-1">Gender</Text>
                  <TextInput
                    className="bg-gray-50 p-5 rounded-3xl text-accent text-lg"
                    value={gender}
                    onChangeText={setGender}
                    placeholder="e.g. Female"
                  />
                </View>
              </View>

              <Text className="text-muted mb-2 font-bold ml-1">Bio</Text>
              <TextInput
                className="bg-gray-50 p-5 rounded-3xl mb-8 text-accent text-lg"
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself..."
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity
                onPress={handleUpdateProfile}
                disabled={updating}
                className={`bg-accent p-5 rounded-3xl items-center mb-10 ${updating ? 'opacity-50' : ''}`}
              >
                {updating ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-xl font-bold">Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
