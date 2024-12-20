'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES, CITIES } from '@/lib/constants';

export function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (category) {
      const searchParams = new URLSearchParams();
      if (city) searchParams.set('city', city);
      if (search) searchParams.set('search', search);

      const queryString = searchParams.toString();
      router.push(`/categories/${category.toLowerCase()}${queryString ? `?${queryString}` : ''}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-card">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-full md:w-[200px]">
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Alege orașul" />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city.toLowerCase()}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Alege categoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Caută meseriași..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
            <span className="ml-2">Caută</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
