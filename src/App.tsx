import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store, RootState } from './store';
import { LoginScreen } from './screens/LoginScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import AcademicDocs from './screens/AcademicDocs';

const Stack = createStackNavigator();

const AppContent = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Catalog" component={CatalogScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="AcademicDocs" component={AcademicDocs} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const ReduxProvider = Provider as any;
  const NavContainer = NavigationContainer as any;
  
  return (
    <ReduxProvider store={store}>
      <NavContainer>
        <AppContent />
      </NavContainer>
    </ReduxProvider>
  );
}
