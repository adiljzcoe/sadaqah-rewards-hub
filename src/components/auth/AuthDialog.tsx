
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      onClose();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signUp(formData.email, formData.password, formData.fullName);
      onClose();
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Welcome</DialogTitle>
          <DialogDescription className="text-slate-300">
            Sign in to your account or create a new one to continue with your donation.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="signin" className="text-slate-300 data-[state=active]:text-white">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-slate-300 data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email" className="text-slate-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="signin-password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name" className="text-slate-300">Full Name</Label>
                <Input
                  id="signup-name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
