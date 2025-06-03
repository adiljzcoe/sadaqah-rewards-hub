import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, DollarSign, Package } from 'lucide-react';
import { useCharityProducts, type CharityProduct } from '@/hooks/useCharityProducts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProductManagement: React.FC = () => {
  const { data: products, refetch } = useCharityProducts();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image_url: '',
    product_type: 'fixed_price' as 'fixed_price' | 'flexible_amount' | 'subscription' | 'cause_campaign',
    pricing_model: 'fixed' as 'fixed' | 'minimum' | 'suggested' | 'tiered',
    fixed_price: '',
    minimum_amount: '',
    suggested_amount: '',
    maximum_amount: '',
    target_amount: '',
    impact_description: '',
    tags: '',
    is_active: true,
    is_featured: false,
    sort_order: '0'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      image_url: '',
      product_type: 'fixed_price',
      pricing_model: 'fixed',
      fixed_price: '',
      minimum_amount: '',
      suggested_amount: '',
      maximum_amount: '',
      target_amount: '',
      impact_description: '',
      tags: '',
      is_active: true,
      is_featured: false,
      sort_order: '0'
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to manage products.",
          variant: "destructive",
        });
        return;
      }

      // Get user's charity profile (assuming they have one)
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile) {
        toast({
          title: "Error",
          description: "Profile not found.",
          variant: "destructive",
        });
        return;
      }

      // For now, we'll use a default charity_id or the first charity
      const { data: charity } = await supabase
        .from('charities')
        .select('id')
        .limit(1)
        .single();

      if (!charity) {
        toast({
          title: "Error",
          description: "No charity found. Please create a charity first.",
          variant: "destructive",
        });
        return;
      }

      const productData = {
        charity_id: charity.id,
        name: formData.name,
        description: formData.description || null,
        category: formData.category,
        image_url: formData.image_url || null,
        product_type: formData.product_type,
        pricing_model: formData.pricing_model,
        fixed_price: formData.fixed_price ? parseInt(formData.fixed_price) * 100 : null,
        minimum_amount: formData.minimum_amount ? parseInt(formData.minimum_amount) * 100 : null,
        suggested_amount: formData.suggested_amount ? parseInt(formData.suggested_amount) * 100 : null,
        maximum_amount: formData.maximum_amount ? parseInt(formData.maximum_amount) * 100 : null,
        target_amount: formData.target_amount ? parseInt(formData.target_amount) * 100 : null,
        impact_description: formData.impact_description || null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        sort_order: parseInt(formData.sort_order) || 0
      };

      let result;
      if (editingProduct) {
        result = await supabase
          .from('charity_products')
          .update(productData)
          .eq('id', editingProduct);
      } else {
        result = await supabase
          .from('charity_products')
          .insert([productData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: editingProduct ? "Product updated successfully" : "Product created successfully",
      });

      resetForm();
      refetch();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: CharityProduct) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      image_url: product.image_url || '',
      product_type: product.product_type,
      pricing_model: product.pricing_model,
      fixed_price: product.fixed_price ? (product.fixed_price / 100).toString() : '',
      minimum_amount: product.minimum_amount ? (product.minimum_amount / 100).toString() : '',
      suggested_amount: product.suggested_amount ? (product.suggested_amount / 100).toString() : '',
      maximum_amount: product.maximum_amount ? (product.maximum_amount / 100).toString() : '',
      target_amount: product.target_amount ? (product.target_amount / 100).toString() : '',
      impact_description: product.impact_description || '',
      tags: product.tags ? product.tags.join(', ') : '',
      is_active: product.is_active,
      is_featured: product.is_featured,
      sort_order: product.sort_order.toString()
    });
    setEditingProduct(product.id);
    setShowAddForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('charity_products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      refetch();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (amount: number) => {
    return `£${(amount / 100).toFixed(2)}`;
  };

  const renderPricingInputs = () => {
    if (formData.pricing_model === 'fixed') {
      return (
        <div>
          <Label htmlFor="fixed_price">Fixed Price (£)</Label>
          <Input
            id="fixed_price"
            type="number"
            step="0.01"
            value={formData.fixed_price}
            onChange={(e) => setFormData({ ...formData, fixed_price: e.target.value })}
          />
        </div>
      );
    }

    if (formData.pricing_model === 'minimum' || formData.pricing_model === 'suggested') {
      return (
        <div className="grid md:grid-cols-3 gap-4">
          {formData.pricing_model === 'minimum' && (
            <div>
              <Label htmlFor="minimum_amount">Minimum Amount (£)</Label>
              <Input
                id="minimum_amount"
                type="number"
                step="0.01"
                value={formData.minimum_amount}
                onChange={(e) => setFormData({ ...formData, minimum_amount: e.target.value })}
              />
            </div>
          )}
          {formData.pricing_model === 'suggested' && (
            <div>
              <Label htmlFor="suggested_amount">Suggested Amount (£)</Label>
              <Input
                id="suggested_amount"
                type="number"
                step="0.01"
                value={formData.suggested_amount}
                onChange={(e) => setFormData({ ...formData, suggested_amount: e.target.value })}
              />
            </div>
          )}
          <div>
            <Label htmlFor="maximum_amount">Maximum Amount (£)</Label>
            <Input
              id="maximum_amount"
              type="number"
              step="0.01"
              value={formData.maximum_amount}
              onChange={(e) => setFormData({ ...formData, maximum_amount: e.target.value })}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-islamic-green-600 hover:bg-islamic-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Emergency Aid, Education, Healthcare"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
              </div>

              {/* Pricing Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing Configuration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Product Type</Label>
                    <Select 
                      value={formData.product_type} 
                      onValueChange={(value: 'fixed_price' | 'flexible_amount' | 'subscription' | 'cause_campaign') => 
                        setFormData({ ...formData, product_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed_price">Fixed Price</SelectItem>
                        <SelectItem value="flexible_amount">Flexible Amount</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="cause_campaign">Cause Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pricing Model</Label>
                    <Select 
                      value={formData.pricing_model} 
                      onValueChange={(value: 'fixed' | 'minimum' | 'suggested' | 'tiered') => 
                        setFormData({ ...formData, pricing_model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="minimum">Minimum</SelectItem>
                        <SelectItem value="suggested">Suggested</SelectItem>
                        <SelectItem value="tiered">Tiered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {renderPricingInputs()}

                <div>
                  <Label htmlFor="target_amount">Target Amount (£)</Label>
                  <Input
                    id="target_amount"
                    type="number"
                    step="0.01"
                    value={formData.target_amount}
                    onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Details</h3>
                <div>
                  <Label htmlFor="impact_description">Impact Description</Label>
                  <Textarea
                    id="impact_description"
                    value={formData.impact_description}
                    onChange={(e) => setFormData({ ...formData, impact_description: e.target.value })}
                    placeholder="Describe the impact of this donation..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="emergency, aid, water, food"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-islamic-green-600 hover:bg-islamic-green-700">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid gap-4">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {product.is_featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {product.fixed_price ? formatPrice(product.fixed_price) : 'Flexible'}
                    </span>
                    <span className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {product.pricing_model}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
