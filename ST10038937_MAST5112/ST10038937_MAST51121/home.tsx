import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image, 
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';




interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  isRead: boolean;
}


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








export default function App() {
  
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: String(new Date().getTime()),
    title: '',
    author: '',
    genre: predefinedGenres[0],
    pages: 0,
    isRead: false,
    
    
  });

  
    // Load stored books when the component mounts
    useEffect(() => {
      loadBooksFromStorage();
    }, []);

     // Function to save books to AsyncStorage
  const saveBooksToStorage = async () => {
    try {
      await AsyncStorage.setItem('books', JSON.stringify(books));
      console.log('Books saved successfully');
    } catch (error) {
      console.error('Error saving books:', error); //testing
    }
  };

   // Function to load books from AsyncStorage
   const loadBooksFromStorage = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('books');
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        setBooks(parsedBooks);
        console.log('Books loaded successfully');
      }
    } catch (error) {
      console.error('Error loading books:', error); //testing
    }
  };

// Function to add a new book
const addBook = () => {
  //if statments to check if a value is entered or not
  if (newBook.title.trim() === '' || newBook.author.trim() === '' || newBook.pages <= 0) {
    if (newBook.title.trim() === '') {
      console.log('Please enter a title');
    }
    if (newBook.author.trim() === '') {
      console.log('Please enter an author');
    }
    if (newBook.pages <= 0) {
      console.log('Please enter a valid number of pages');
    }
    return; // Stop execution if any of the conditions is not met
  }

  // If all conditions are met, proceed with adding the book
  const bookToAdd: Book = {
    ...newBook,
    id: String(new Date().getTime()),
  };

  setBooks((prevBooks) => [bookToAdd, ...prevBooks]);
  setNewBook({
    id: String(new Date().getTime()),
    title: '',
    author: '',
    genre: predefinedGenres[0],
    pages: 0,
    isRead: false,
  });

  // Save the updated books to AsyncStorage
  saveBooksToStorage();
};



  const updateGenre = (genre: string) => {
    setNewBook({ ...newBook, genre });
  };

  const opacity = new Animated.Value(0);

  Animated.timing(opacity, {
    toValue: 1,  
    duration: 1000,  
    useNativeDriver: false, 
  }).start();
  

  
  
  return (
    
    
    <View style={styles.container}>
    <Text style={styles.header}>My Book Collection</Text>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newBook.title}
        onChangeText={(text) => setNewBook({ ...newBook, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={newBook.author}
        onChangeText={(text) => setNewBook({ ...newBook, author: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Pages"
        value={newBook.pages.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setNewBook({ ...newBook, pages: parseInt(text) })}
      />
      <ScrollView horizontal contentContainerStyle={styles.genrePicker}>
        {predefinedGenres.map((genre) => (
       <View key={genre} style={styles.genreOptionContainer}>
       <TouchableOpacity
              style={[
              styles.genreOption,
                {
                  backgroundColor: newBook.genre === genre ? '#007AFF' : '#eee',
                },
              ]}
              onPress={() => updateGenre(genre)}
            >
            <Text style={{ color: newBook.genre === genre ? '#fff' : '#333' }}>
                {genre}
          </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={addBook}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.statsContainer}>
      <Text>
        Average Pages per Book: {books.length > 0 ? (books.reduce((total, book) => total + book.pages, 0) / books.length).toFixed(2) : '0'}
      </Text>
      <Text>
        Total Pages: {books.length > 0 ? books.reduce((total, book) => total + book.pages, 0) : '0'}
      </Text>
    </View>

    <ScrollView>
    <Animated.View style={{ opacity }}>
  <FlatList
    data={books.slice(0, 100)}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.bookItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
            source={require('./bookicon.jpg')}
            style={{ width: 20, height: 20, marginRight: 10 }}
        />
          <Text style={styles.bookTitle}>{item.title}</Text>
       </View>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookGenre}>{item.genre}</Text>
        <Text style={styles.bookPages}>{item.pages} pages</Text>
      </View>
    )}
  />
</Animated.View>
</ScrollView>
  </View>
  
);
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  navbutton: {
    flex: 1, 
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  navbuttontext: {
    color: 'white',
    textAlign: 'center', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  genrePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  genreOptionContainer: {
    marginRight: 8,
  },
  genreOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    marginTop: 16,
  },
  bookItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  bookTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#555',
  },
  bookGenre: {
    fontSize: 16,
    color: '#007AFF',
  },
  bookPages: {
    fontSize: 14,
    color: '#777',
  },
});