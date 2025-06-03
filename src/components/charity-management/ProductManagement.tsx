
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Image, DollarSign, Target } from 'lucide-react';
import { useCharityProducts } from '@/hooks/useCharityProducts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductManagementProps {
  charityId: string;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ charityId }) => {
  const { data: products, refetch } = useCharityProducts(charityId);
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    product_type: 'fixed_price' as const,
    pricing_model: 'fixed' as const,
    fixed_price: '',
    minimum_amount: '',
    suggested_amount: '',
    maximum_amount: '',
    image_url: '',
    is_featured: false,
    target_amount: '',
    beneficiaries_count: '',
    impact_description: '',
    tags: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      product_type: 'fixed_price',
      pricing_model: 'fixed',
      fixed_price: '',
      minimum_amount: '',
      suggested_amount: '',
      maximum_amount: '',
      image_url: '',
      is_featured: false,
      target_amount: '',
      beneficiaries_count: '',
      impact_description: '',
      tags: ''
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      charity_id: charityId,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      product_type: formData.product_type,
      pricing_model: formData.pricing_model,
      fixed_price: formData.fixed_price ? parseInt(formData.fixed_price) * 100 : null,
      minimum_amount: formData.minimum_amount ? parseInt(formData.minimum_amount) * 100 : null,
      suggested_amount: formData.suggested_amount ? parseInt(formData.suggested_amount) * 100 : null,
      maximum_amount: formData.maximum_amount ? parseInt(formData.maximum_amount) * 100 : null,
      image_url: formData.image_url || null,
      is_featured: formData.is_featured,
      target_amount: formData.target_amount ? parseInt(formData.target_amount) * 100 : null,
      beneficiaries_count: formData.beneficiaries_count ? parseInt(formData.beneficiaries_count) : null,
      impact_description: formData.impact_description || null,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null
    };

    try {
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
        description: editingProduct ? "Product updated successfully" : "Product added successfully",
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

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      product_type: product.product_type,
      pricing_model: product.pricing_model,
      fixed_price: product.fixed_price ? (product.fixed_price / 100).toString() : '',
      minimum_amount: product.minimum_amount ? (product.minimum_amount / 100).toString() : '',
      suggested_amount: product.suggested_amount ? (product.suggested_amount / 100).toString() : '',
      maximum_amount: product.maximum_amount ? (product.maximum_amount / 100).toString() : '',
      image_url: product.image_url || '',
      is_featured: product.is_featured,
      target_amount: product.target_amount ? (product.target_amount / 100).toString() : '',
      beneficiaries_count: product.beneficiaries_count?.toString() || '',
      impact_description: product.impact_description || '',
      tags: product.tags ? product.tags.join(', ') : ''
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
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Product Type</Label>
                  <Select 
                    value={formData.product_type} 
                    onValueChange={(value: any) => setFormData({ ...formData, product_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed_price">Fixed Price</SelectItem>
                      <SelectItem value="flexible_amount">Flexible Amount</SelectItem>
                      <SelectItem value="subscription">Monthly Sponsorship</SelectItem>
                      <SelectItem value="cause_campaign">Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pricing Model</Label>
                  <Select 
                    value={formData.pricing_model} 
                    onValueChange={(value: any) => setFormData({ ...formData, pricing_model: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="minimum">Minimum Amount</SelectItem>
                      <SelectItem value="suggested">Suggested Amount</SelectItem>
                      <SelectItem value="free_choice">Free Choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {formData.pricing_model === 'fixed' && (
                  <div>
                    <Label htmlFor="fixed_price">Fixed Price (£)</Label>
                    <Input
                      id="fixed_price"
                      type="number"
                      value={formData.fixed_price}
                      onChange={(e) => setFormData({ ...formData, fixed_price: e.target.value })}
                    />
                  </div>
                )}
                {(formData.pricing_model === 'minimum' || formData.pricing_model === 'suggested') && (
                  <div>
                    <Label htmlFor="minimum_amount">Minimum Amount (£)</Label>
                    <Input
                      id="minimum_amount"
                      type="number"
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
                    value={formData.maximum_amount}
                    onChange={(e) => setFormData({ ...formData, maximum_amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target_amount">Target Amount (£)</Label>
                  <Input
                    id="target_amount"
                    type="number"
                    value={formData.target_amount}
                    onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiaries_count">Beneficiaries Count</Label>
                  <Input
                    id="beneficiaries_count"
                    type="number"
                    value={formData.beneficiaries_count}
                    onChange={(e) => setFormData({ ...formData, beneficiaries_count: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="impact_description">Impact Description</Label>
                <Textarea
                  id="impact_description"
                  value={formData.impact_description}
                  onChange={(e) => setFormData({ ...formData, impact_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="emergency, water, education"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured Product</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-islamic-green-600 hover:bg-islamic-green-700">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <Badge variant={product.is_featured ? "default" : "outline"}>
                      {product.category}
                    </Badge>
                    {product.is_featured && (
                      <Badge className="bg-yellow-500">Featured</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {product.pricing_model}
                    </span>
                    {product.target_amount && (
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        £{(product.target_amount / 100).toFixed(2)} target
                      </span>
                    )}
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
