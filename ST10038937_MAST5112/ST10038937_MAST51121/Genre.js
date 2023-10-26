import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const predefinedGenres = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Fantasy',
  'Science Fiction',
  'Romance',
  'Thriller',
  'Horror',
  'Adventure',
  'Biography',
  'History',
  'Self-Help',
  'Cooking',
  'Travel',
  'Science',
  'Poetry',
  'Drama',
  'Comedy',
  'Satire',
  'Education',
];

const GenrePage = () => {
  const booksReadByGenre = {
    'Fiction': 50,
    'Non-Fiction': 30,
    'Mystery': 25,
    'Fantasy': 40,
    'Science Fiction': 35,
    'Romance': 20,
    'Thriller': 30,
    'Horror': 15,
    'Adventure': 30,
    'Biography': 15,
    'History': 25,
    'Self-Help': 10,
    'Cooking': 5,
    'Travel': 10,
    'Science': 15,
    'Poetry': 10,
    'Drama': 20,
    'Comedy': 10,
    'Satire': 5,
    'Education': 15,
  };

  return (
    <ScrollView style={styles.container}>
      {predefinedGenres.map((genre) => (
        <View key={genre} style={styles.genreSection}>
          <Text style={styles.genreTitle}>{genre}</Text>
          <Text>Total Books Read: {booksReadByGenre[genre] || 0}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  genreSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GenrePage;
