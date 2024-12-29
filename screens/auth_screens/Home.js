import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/AuthSlice';
import { getUserDetails } from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const data = await getUserDetails();
                setUserData(data);
            } catch (error) {
                ("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem('accessToken'),
                AsyncStorage.removeItem('refreshToken'),
            ]);
            dispatch(logout());
        } catch (error) {
            //Logout even if token removal failed
            dispatch(logout());

        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome, {user?.username || "User"}!</Text>

            {userData ? (
                <View style={styles.userDetails}>
                    <Image
                        source={{ uri: userData.image }}
                        style={styles.userImage}
                    />
                    <Text style={styles.userText}>
                        Name: {userData.firstName} {userData.lastName}
                    </Text>
                    <Text style={styles.userText}>Email: {userData.email}</Text>
                    <Text style={styles.userText}>Gender: {userData.gender}</Text>
                </View>
            ) : (
                <Text>Loading user details...</Text>
            )}

            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userDetails: {
        alignItems: 'center',
        marginBottom: 20,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default HomeScreen;
