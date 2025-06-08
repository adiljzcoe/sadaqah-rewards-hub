
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Book, Heart, Play, Upload, Download } from 'lucide-react';

const QuranManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    surah_number: '',
    surah_name_arabic: '',
    surah_name_english: '',
    verse_number: '',
    arabic_text: '',
    english_translation: '',
    audio_url: '',
    reciter: '',
    is_featured: false
  });

  const mockSurahs = [
    {
      id: '1',
      surah_number: 1,
      surah_name_arabic: 'الفاتحة',
      surah_name_english: 'Al-Fatiha',
      total_verses: 7,
      revelation_type: 'Meccan',
      likes_count: 1250,
      total_plays: 15420,
      is_featured: true
    },
    {
      id: '2',
      surah_number: 2,
      surah_name_arabic: 'البقرة',
      surah_name_english: 'Al-Baqarah',
      total_verses: 286,
      revelation_type: 'Medinan',
      likes_count: 890,
      total_plays: 8730,
      is_featured: false
    }
  ];

  const mockVerses = [
    {
      id: '1',
      surah_id: '1',
      verse_number: 1,
      arabic_text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      english_translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      likes_count: 450,
      audio_url: 'https://audio.example.com/1-1.mp3',
      reciter: 'Mishary Rashid Alafasy'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating Quran content:', formData);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      surah_number: '',
      surah_name_arabic: '',
      surah_name_english: '',
      verse_number: '',
      arabic_text: '',
      english_translation: '',
      audio_url: '',
      reciter: '',
      is_featured: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quran Management</h2>
          <p className="text-muted-foreground">Manage Quran surahs, verses, translations, and audio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="surahs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="surahs">Surahs</TabsTrigger>
          <TabsTrigger value="verses">Verses</TabsTrigger>
          <TabsTrigger value="audio">Audio Management</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="surahs">
          <Card>
            <CardHeader>
              <CardTitle>Surah Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Verses</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSurahs.map((surah) => (
                    <TableRow key={surah.id}>
                      <TableCell className="font-mono">{surah.surah_number}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-lg">{surah.surah_name_arabic}</div>
                          <div className="text-sm text-muted-foreground">{surah.surah_name_english}</div>
                        </div>
                      </TableCell>
                      <TableCell>{surah.total_verses} verses</TableCell>
                      <TableCell>
                        <Badge variant={surah.revelation_type === 'Meccan' ? 'default' : 'secondary'}>
                          {surah.revelation_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Heart className="h-3 w-3" />
                            {surah.likes_count}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Play className="h-3 w-3" />
                            {surah.total_plays}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={surah.is_featured ? 'bg-yellow-500' : 'bg-gray-500'}>
                          {surah.is_featured ? 'Featured' : 'Standard'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verses">
          <Card>
            <CardHeader>
              <CardTitle>Verse Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select Surah" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSurahs.map((surah) => (
                        <SelectItem key={surah.id} value={surah.id}>
                          {surah.surah_number}. {surah.surah_name_english}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Verse
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Verse</TableHead>
                      <TableHead>Arabic Text</TableHead>
                      <TableHead>Translation</TableHead>
                      <TableHead>Audio</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVerses.map((verse) => (
                      <TableRow key={verse.id}>
                        <TableCell className="font-mono">{verse.verse_number}</TableCell>
                        <TableCell>
                          <div className="font-arabic text-lg max-w-md">{verse.arabic_text}</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md text-sm">{verse.english_translation}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3" />
                            </Button>
                            <div className="text-xs text-muted-foreground">{verse.reciter}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {verse.likes_count}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle>Audio Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Audio recitation management</p>
                <p className="text-sm">Upload, manage, and organize Quran recitations by different reciters</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations">
          <Card>
            <CardHeader>
              <CardTitle>Translation Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Multiple language translations</p>
                <p className="text-sm">Manage translations in different languages and by various scholars</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Surahs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">114</div>
                <p className="text-sm text-muted-foreground">Complete</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Verses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6,236</div>
                <p className="text-sm text-muted-foreground">All verses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Plays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">425,680</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Likes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28,450</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuranManagement;
