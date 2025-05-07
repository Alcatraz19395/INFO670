import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PictureViewer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { image } = route.params || {};

  if (!image) return <Text>No Image</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.fullImage} />
      <Text>{image.title}</Text>
      <Button title="Back to Gallery" onPress={() => navigation.navigate('Gallery')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  fullImage: { width: 300, height: 300 },
});
