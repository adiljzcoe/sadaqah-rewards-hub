
import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';

const ShoppingCartWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalAmount } = useCart();

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'donation':
        return 'bg-emerald-100 text-emerald-800';
      case 'membership':
        return 'bg-blue-100 text-blue-800';
      case 'product':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckout = () => {
    // Here you would navigate to checkout page or open checkout modal
    console.log('Proceeding to checkout with items:', items);
    // For now, we'll just close the cart
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Shopping Bag Icon */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-white border-2 border-orange-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{
            animation: totalItems > 0 ? 'gentle-pulse 2s ease-in-out infinite' : 'none'
          }}
        >
          <ShoppingBag className="h-6 w-6 text-orange-600" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </button>
      </div>

      {/* Expandable Cart Details */}
      {isOpen && (
        <div className="fixed bottom-32 right-4 z-50 w-80 max-h-96 animate-fade-in">
          <Card className="shadow-xl border-2 border-orange-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-orange-600" />
                  Your Cart
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {items.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium truncate">{item.name}</h4>
                            <Badge className={`text-xs ${getItemTypeColor(item.type)}`}>
                              {item.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">{formatPrice(item.price)} each</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-lg text-orange-600">{formatPrice(totalAmount)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Proceed to Checkout
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearCart}
                        className="w-full text-gray-600 hover:text-red-600"
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ShoppingCartWidget;
