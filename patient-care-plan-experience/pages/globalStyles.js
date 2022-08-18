import { Image, StyleSheet, Text, View } from 'react-native';

export const globalStyles = StyleSheet.create({
   defaultFont: {
      fontFamily: 'WorkSans',
    },
  standardButton: {
    backgroundColor: '#F7F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: "100%",
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  linkButton: {
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: 'black',    
  },
  submitButtonText: {
    color: 'white',    
  },

  buttonText: {
    fontSize: 16,
    color: '#3A00E5',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: "100%",
    marginBottom: 20,
    padding:10,
    fontSize: 16,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1
  
  },
  label: {
    textAlign: 'left',
    width: '100%',
  }

});
  