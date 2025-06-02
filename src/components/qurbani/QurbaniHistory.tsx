
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, MapPin, Users, Clock, CheckCircle, Package } from 'lucide-react';

const QurbaniHistory = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['qurbani-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('qurbani_orders')
        .select(`
          *,
          animal:qurbani_animals(animal_name, animal_type),
          location:qurbani_locations(name, country, region),
          charity:charities(name, logo_url)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const getStatusColor = (status: string) => {
    const colors = {
      preorder: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-yellow-100 text-yellow-800',
      slaughtered: 'bg-orange-100 text-orange-800',
      distributed: 'bg-green-100 text-green-800',
      completed: 'bg-emerald-100 text-emerald-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      preorder: Clock,
      confirmed: Package,
      slaughtered: Users,
      distributed: Users,
      completed: CheckCircle
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const getAnimalIcon = (type: string) => {
    const icons = {
      sheep: '🐑',
      goat: '🐐', 
      cow: '🐄',
      buffalo: '🐃',
      camel: '🐪'
    };
    return icons[type as keyof typeof icons] || '🐑';
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Sign In Required</h3>
          <p className="text-gray-500">Please sign in to view your Qurbani order history.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-24 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-4">
            You haven't placed any Qurbani orders yet. Start by selecting an animal and location.
          </p>
          <Button onClick={() => window.location.reload()}>
            Place Your First Order
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">My Qurbani Orders</h2>
              <p className="text-indigo-100">
                Track your current and past Qurbani orders
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">📋</div>
              <Badge variant="secondary">
                {orders.length} Order{orders.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    {order.animal?.animal_type ? getAnimalIcon(order.animal.animal_type) : '⚡'}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {order.animal?.animal_name || 'General Qurbani'}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Order #{order.id.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <div className="font-medium">{order.location?.name}</div>
                    <div className="text-gray-500">{order.location?.country}</div>
                  </div>
                </div>

                {/* Shares & Amount */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <div className="font-medium">{order.shares_purchased} Share{order.shares_purchased !== 1 ? 's' : ''}</div>
                    <div className="text-gray-500">£{(order.total_amount / 100).toFixed(2)}</div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div className="text-sm">
                    <div className="font-medium">Ordered</div>
                    <div className="text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Charity */}
                <div className="flex items-center gap-2">
                  <div className="text-sm">
                    <div className="font-medium">Partner</div>
                    <div className="text-gray-500">{order.charity?.name || 'Mixed Providers'}</div>
                  </div>
                </div>
              </div>

              {/* Recipient & Instructions */}
              {(order.recipient_name || order.special_instructions) && (
                <div className="mt-4 pt-4 border-t">
                  {order.recipient_name && (
                    <div className="text-sm mb-2">
                      <span className="font-medium">Recipient:</span> {order.recipient_name}
                    </div>
                  )}
                  {order.special_instructions && (
                    <div className="text-sm">
                      <span className="font-medium">Instructions:</span> {order.special_instructions}
                    </div>
                  )}
                </div>
              )}

              {/* Status Timeline */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className={`flex items-center gap-1 ${['preorder', 'confirmed', 'slaughtered', 'distributed', 'completed'].indexOf(order.status) >= 0 ? 'text-emerald-600' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Ordered</span>
                  </div>
                  <div className={`flex items-center gap-1 ${['confirmed', 'slaughtered', 'distributed', 'completed'].indexOf(order.status) >= 0 ? 'text-emerald-600' : ''}`}>
                    <div className={`w-2 h-2 rounded-full ${['confirmed', 'slaughtered', 'distributed', 'completed'].indexOf(order.status) >= 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span>Confirmed</span>
                  </div>
                  <div className={`flex items-center gap-1 ${['slaughtered', 'distributed', 'completed'].indexOf(order.status) >= 0 ? 'text-emerald-600' : ''}`}>
                    <div className={`w-2 h-2 rounded-full ${['slaughtered', 'distributed', 'completed'].indexOf(order.status) >= 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span>Slaughtered</span>
                  </div>
                  <div className={`flex items-center gap-1 ${['distributed', 'completed'].indexOf(order.status) >= 0 ? 'text-emerald-600' : ''}`}>
                    <div className={`w-2 h-2 rounded-full ${['distributed', 'completed'].indexOf(order.status) >= 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span>Distributed</span>
                  </div>
                  <div className={`flex items-center gap-1 ${order.status === 'completed' ? 'text-emerald-600' : ''}`}>
                    <div className={`w-2 h-2 rounded-full ${order.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              {/* Impact Stats for completed orders */}
              {order.status === 'completed' && order.beneficiaries_fed && (
                <div className="mt-4 pt-4 border-t">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">
                        Your Qurbani fed {order.beneficiaries_fed} people
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QurbaniHistory;
