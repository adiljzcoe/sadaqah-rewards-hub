
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Eye, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GiftCardProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  icon: string;
  color: string;
  min_amount: number;
  max_amount: number;
  is_active: boolean;
  sort_order: number;
  product_type: string;
  assigned_charity_id: string | null;
  created_at: string;
  updated_at: string;
  charities?: { name: string };
}

interface Charity {
  id: string;
  name: string;
  verified: boolean;
}

const GiftCardManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<GiftCardProduct[]>([]);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<GiftCardProduct | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    image_url: '',
    icon: 'Gift',
    color: 'bg-blue-500',
    min_amount: 1000,
    max_amount: 100000,
    sort_order: 0,
    product_type: 'shared',
    assigned_charity_id: null as string | null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products with charity info
      const { data: productsData, error: productsError } = await supabase
        .from('gift_card_products')
        .select(`
          *,
          charities (name)
        `)
        .order('sort_order', { ascending: true });

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch charities
      const { data: charitiesData, error: charitiesError } = await supabase
        .from('charities')
        .select('id, name, verified')
        .eq('verified', true);

      if (charitiesError) throw charitiesError;
      setCharities(charitiesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load gift card products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        assigned_charity_id: newProduct.product_type === 'charity_specific' ? newProduct.assigned_charity_id : null
      };

      const { error } = await supabase
        .from('gift_card_products')
        .insert([productData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gift card product created successfully.",
      });

      setIsCreating(false);
      setNewProduct({
        name: '',
        description: '',
        category: '',
        image_url: '',
        icon: 'Gift',
        color: 'bg-blue-500',
        min_amount: 1000,
        max_amount: 100000,
        sort_order: 0,
        product_type: 'shared',
        assigned_charity_id: null
      });
      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Failed to create gift card product.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (id: string, updates: Partial<GiftCardProduct>) => {
    try {
      const { error } = await supabase
        .from('gift_card_products')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully.",
      });

      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('gift_card_products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gift Card Management</h2>
          <p className="text-muted-foreground">Create and manage gift card products</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Product
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Gift Card Product</CardTitle>
            <CardDescription>Add a new cause for gift cards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g., Water Well Construction"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="children">Children</SelectItem>
                    <SelectItem value="emergency">Emergency Relief</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Describe the purpose of this cause"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product_type">Product Type</Label>
                <Select value={newProduct.product_type} onValueChange={(value) => setNewProduct({ ...newProduct, product_type: value, assigned_charity_id: value === 'shared' ? null : newProduct.assigned_charity_id })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shared">Shared (Split among charities)</SelectItem>
                    <SelectItem value="charity_specific">Charity Specific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newProduct.product_type === 'charity_specific' && (
                <div>
                  <Label htmlFor="assigned_charity">Assigned Charity</Label>
                  <Select value={newProduct.assigned_charity_id || ''} onValueChange={(value) => setNewProduct({ ...newProduct, assigned_charity_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select charity" />
                    </SelectTrigger>
                    <SelectContent>
                      {charities.map((charity) => (
                        <SelectItem key={charity.id} value={charity.id}>
                          {charity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select value={newProduct.icon} onValueChange={(value) => setNewProduct({ ...newProduct, icon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Heart">Heart</SelectItem>
                    <SelectItem value="Building">Building</SelectItem>
                    <SelectItem value="Droplets">Droplets</SelectItem>
                    <SelectItem value="Users">Users</SelectItem>
                    <SelectItem value="Gift">Gift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Select value={newProduct.color} onValueChange={(value) => setNewProduct({ ...newProduct, color: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-red-500">Red</SelectItem>
                    <SelectItem value="bg-blue-500">Blue</SelectItem>
                    <SelectItem value="bg-green-500">Green</SelectItem>
                    <SelectItem value="bg-cyan-500">Cyan</SelectItem>
                    <SelectItem value="bg-pink-500">Pink</SelectItem>
                    <SelectItem value="bg-purple-500">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={newProduct.sort_order}
                  onChange={(e) => setNewProduct({ ...newProduct, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="min_amount">Min Amount (pence)</Label>
                <Input
                  id="min_amount"
                  type="number"
                  value={newProduct.min_amount}
                  onChange={(e) => setNewProduct({ ...newProduct, min_amount: parseInt(e.target.value) || 0 })}
                  placeholder="1000"
                />
              </div>
              <div>
                <Label htmlFor="max_amount">Max Amount (pence)</Label>
                <Input
                  id="max_amount"
                  type="number"
                  value={newProduct.max_amount}
                  onChange={(e) => setNewProduct({ ...newProduct, max_amount: parseInt(e.target.value) || 0 })}
                  placeholder="100000"
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={newProduct.image_url}
                  onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateProduct}>Create Product</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Gift Card Products</CardTitle>
          <CardDescription>Manage your gift card causes and products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sort Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="w-10 h-8 object-cover rounded" />
                      )}
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.description}</div>
                        {product.charities && (
                          <div className="text-xs text-blue-600">→ {product.charities.name}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.product_type === 'shared' ? 'default' : 'secondary'}>
                      {product.product_type === 'shared' ? 'Shared' : 'Charity Specific'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      £{(product.min_amount / 100).toFixed(2)} - £{(product.max_amount / 100).toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={product.is_active}
                        onCheckedChange={(checked) => handleUpdateProduct(product.id, { is_active: checked })}
                      />
                      <span className="text-sm">{product.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.sort_order}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GiftCardManagement;
