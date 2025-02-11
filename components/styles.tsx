import { StyleSheet, TextStyle, ViewStyle, Dimensions, ImageStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  link: TextStyle;
  messagesList: ViewStyle;
  messageContainer: ViewStyle;
  userMessage: ViewStyle;
  assistantMessage: ViewStyle;
  userMessageText: TextStyle;
  assistantMessageText: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonText: TextStyle;
  centerButton: ViewStyle;
  errorText: TextStyle;
  toggleBar: ViewStyle;
  toggleBarText: TextStyle;
  routeOptionsContainer: ViewStyle;
  routeInput: TextStyle;
  modeContainer: ViewStyle;
  modeButton: ViewStyle;
  selectedMode: ViewStyle;
  map: ViewStyle;
  callout: ViewStyle;
  calloutContainer: ViewStyle;
  calloutContent: ViewStyle;
  calloutTitle: TextStyle;
  calloutText: TextStyle;
  calloutLink: TextStyle;
  markerTouchArea: ViewStyle;
  markerContainer: ViewStyle;
  promptAndInputContainer: ViewStyle;
  promptContainer: ViewStyle;
  promptButton: ViewStyle;
  promptButtonText: TextStyle;
  reportButton: ViewStyle;
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  inputLabel: TextStyle;
  picker: ViewStyle;
  textArea: TextStyle;
  mediaPreview: ImageStyle;
  cancelButton: ViewStyle;
  cancelButtonText: TextStyle;
  calloutView: ViewStyle;
  customMarker: ViewStyle;
  markerText: TextStyle;
  legendContainer: ViewStyle;
  legendTitle: TextStyle;
  legendItem: ViewStyle;
  legendColor: ViewStyle;
  legendText: TextStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  errorContainer: ViewStyle;
}

const Colors = {
  primary: '#007AFF',
  secondary: '#687076',
  title: '#687076',
  background: '#ffffff',
  text: '#ffffff',
  inputBackground: '#f0f0f0',
  errorText: '#ff0000',
};

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.title,
    marginBottom: 20,
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
  },
  userMessage: {
    backgroundColor: Colors.secondary,
    borderColor: 'black',
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  userMessageText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  assistantMessageText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.inputBackground,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    margin: 5,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f0',
    padding: 20,
  },
  toggleBar: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggleBarText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    alignItems: 'center',
  },
  routeOptionsContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  routeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  modeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMode: {
    backgroundColor: '#e3f2fd',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 8,
  },
  callout: {
    width: 600,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    width: 200,
  },
  calloutContent: {
    padding: 15,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  calloutText: {
    fontSize: 16,
    marginBottom: 5,
  },
  calloutLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontSize: 16,
  },
  markerContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerTouchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  promptAndInputContainer: {
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  promptContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  promptButton: {
    backgroundColor: 'white',
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 5,
    flexBasis: '48%',
    flexGrow: 1,
    marginHorizontal: '1%',
  },
  promptButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: Colors.text,
  },
  reportButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 25,
    height: 50,
  },
  textArea: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    textAlignVertical: 'top',
    minHeight: 150,
    fontSize: 16,
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 25,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  calloutView: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    width: 200,
  },
  customMarker: {
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  legendContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    opacity: 0.8,
  },
  legendTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorRetryButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  errorRetryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
