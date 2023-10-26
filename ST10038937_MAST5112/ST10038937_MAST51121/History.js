import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const books = [
  { title: 'Book 1', author: 'Author 1', pages: 300 },
  { title: 'Book 2', author: 'Author 2', pages: 250 },
  { title: 'Book 3', author: 'Author 3', pages: 400 },
];

const HistoryPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History Page</Text>
      {books.map((book, index) => (
        <View key={index} style={styles.card}>
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.pages}>Pages: {book.pages}</Text>
       </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    marginTop: 8,
  },
  pages: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default HistoryPage;
