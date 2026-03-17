import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProductById, clearSelectedProduct } from '../store/productSlice';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react-native';

export const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loaderText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !selectedProduct) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Produto não encontrado'}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const discountedPrice = (selectedProduct.price * (1 - selectedProduct.discountPercentage / 100)).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft color="#0f172a" size={20} />
          </TouchableOpacity>
          <View style={styles.navRight}>
            <TouchableOpacity style={styles.navBtn}>
              <Share2 color="#0f172a" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn}>
              <Heart color="#0f172a" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedProduct.thumbnail }} style={styles.mainImage} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.brand}>{selectedProduct.brand}</Text>
              <Text style={styles.title}>{selectedProduct.title}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.ratingText}>{selectedProduct.rating}</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${discountedPrice}</Text>
            <Text style={styles.oldPrice}>${selectedProduct.price}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{Math.round(selectedProduct.discountPercentage)}% OFF</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>

          <View style={styles.stockInfo}>
            <Text style={styles.stockLabel}>Disponibilidade</Text>
            <Text style={[styles.stockValue, selectedProduct.stock > 0 ? styles.inStock : styles.outOfStock]}>
              {selectedProduct.stock > 0 ? `${selectedProduct.stock} em estoque` : 'Esgotado'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton}>
          <ShoppingCart color="#fff" size={20} />
          <Text style={styles.buyButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 12, color: '#64748b' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#ef4444', marginBottom: 20, textAlign: 'center' },
  backBtn: { backgroundColor: '#0f172a', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  backBtnText: { color: '#fff', fontWeight: 'bold' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  navRight: { flexDirection: 'row', gap: 12 },
  navBtn: { width: 44, height: 44, backgroundColor: '#f1f5f9', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  imageContainer: { height: 350, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' },
  mainImage: { width: '80%', height: '80%', resizeMode: 'contain' },
  infoContainer: { padding: 24, paddingBottom: 100 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  brand: { fontSize: 12, fontWeight: 'bold', color: '#10b981', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', flex: 1, marginRight: 12 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  ratingText: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, marginBottom: 24 },
  price: { fontSize: 32, fontWeight: 'bold', color: '#0f172a' },
  oldPrice: { fontSize: 18, color: '#94a3b8', textDecorationLine: 'line-through' },
  discountBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { color: '#10b981', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  description: { fontSize: 16, color: '#64748b', lineHeight: 24, marginBottom: 24 },
  stockInfo: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#f8fafc', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9' },
  stockLabel: { fontSize: 14, color: '#64748b' },
  stockValue: { fontSize: 14, fontWeight: 'bold' },
  inStock: { color: '#10b981' },
  outOfStock: { color: '#ef4444' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  buyButton: { backgroundColor: '#0f172a', height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  buyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
