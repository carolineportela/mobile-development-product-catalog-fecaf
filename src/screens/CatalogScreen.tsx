import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProductsByCategory } from '../store/productSlice';
import { logout } from '../store/authSlice';
import { LogOut, ShoppingBag, Search, Filter } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const MALE_CATEGORIES = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const FEMALE_CATEGORIES = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

export const CatalogScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation() as any;
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const categories = activeTab === 'male' ? MALE_CATEGORIES : FEMALE_CATEGORIES;
    dispatch(fetchProductsByCategory(categories));
  }, [activeTab, dispatch]);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        {item.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round(item.discountPercentage)}%</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category.replace('-', ' ')}</Text>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.bagButton}>
            <ShoppingBag size={14} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, {user?.name}</Text>
          <Text style={styles.headerTitle}>Nosso Catálogo</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => dispatch(logout())}
        >
          <LogOut color="#64748b" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search color="#94a3b8" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#fff" size={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'male' && styles.activeTab]}
          onPress={() => setActiveTab('male')}
        >
          <Text style={[styles.tabText, activeTab === 'male' && styles.activeTabText]}>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'female' && styles.activeTab]}
          onPress={() => setActiveTab('female')}
        >
          <Text style={[styles.tabText, activeTab === 'female' && styles.activeTabText]}>Feminino</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.loaderText}>Carregando produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10,
  },
  welcomeText: { fontSize: 12, color: '#64748b' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  logoutButton: { width: 40, height: 40, backgroundColor: '#f1f5f9', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  searchWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 16, paddingHorizontal: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 48, fontSize: 14 },
  filterButton: { width: 48, height: 48, backgroundColor: '#0f172a', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', backgroundColor: '#f1f5f9', marginHorizontal: 20, padding: 4, borderRadius: 16, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  tabText: { fontSize: 14, fontWeight: 'bold', color: '#64748b' },
  activeTabText: { color: '#0f172a' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 12, color: '#64748b', fontWeight: '500' },
  listContent: { paddingHorizontal: 12, paddingBottom: 20 },
  productCard: { flex: 1, margin: 8, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#f1f5f9' },
  imageWrapper: { height: 160, backgroundColor: '#f8fafc', position: 'relative' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  discountBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#10b981', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  productInfo: { padding: 12 },
  productCategory: { fontSize: 10, color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  productTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#10b981' },
  bagButton: { width: 28, height: 28, backgroundColor: '#0f172a', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
});
