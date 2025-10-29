import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StudentLogin() {
  const [regno, setRegno] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const BASE_URL = 'https://exammangement-system.onrender.com';  // Update this to your server's IP/domain
      const response = await axios.get(`${BASE_URL}/api/login/student/${regno}`);
      console.log("response in student login - ", response);
      if (response.status !== 200) {
        Alert.alert('Error', 'Registration number not found');
        return;
      }

      const data = response.data;

      if (data.password === password) {
        Alert.alert('Success', 'Login successful');

        const year = data.year;
        
        setTimeout(() => {
            router.push({
            pathname: '/StudentMain',
            params: { API: `${BASE_URL}/api/${year}/${regno}` },
            });
        }, 1000);
        
      } else {
        Alert.alert('Error', 'Invalid password');
      }
    } catch (err) {
      Alert.alert('Error', 'Login failed due to network error, Please try again');
      console.error("err in student login - ", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>
          Register number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Register Number"
          value={regno}
          onChangeText={setRegno}
        />

        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loginBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    marginLeft: -40,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});



// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
