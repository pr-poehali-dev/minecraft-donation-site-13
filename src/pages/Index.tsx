import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [promoCode, setPromoCode] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const donationPackages = [
    {
      id: 'vip',
      name: 'VIP',
      price: 299,
      color: 'bg-gradient-to-r from-minecraft-gold to-yellow-500',
      features: ['Доступ к VIP зонам', 'Эксклюзивные предметы', 'Приоритет в очереди', 'Цветной ник'],
      icon: 'Crown'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 599,
      color: 'bg-gradient-to-r from-minecraft-blue to-blue-600',
      features: ['Все VIP привилегии', 'Дополнительные команды', 'Личный дом', 'Быстрая телепортация'],
      icon: 'Gem'
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: 999,
      color: 'bg-gradient-to-r from-minecraft-purple to-purple-600',
      features: ['Все Premium привилегии', 'Креативный режим', 'Управление погодой', 'Неограниченные ресурсы'],
      icon: 'Zap'
    }
  ];

  const playerStats = [
    { label: 'Онлайн игроков', value: '1,247', change: '+12%' },
    { label: 'Всего пользователей', value: '15,432', change: '+24%' },
    { label: 'Активных донатеров', value: '2,156', change: '+8%' }
  ];

  return (
    <div className="min-h-screen bg-minecraft-dark text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-minecraft-dark/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-minecraft-blue rounded-sm flex items-center justify-center">
                <Icon name="Gamepad2" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold minecraft-text">MineCraft Донат</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-minecraft-blue transition-colors">Главная</a>
              <a href="#packages" className="hover:text-minecraft-blue transition-colors">Пакеты</a>
              <a href="#stats" className="hover:text-minecraft-blue transition-colors">Статистика</a>
              <a href="#support" className="hover:text-minecraft-blue transition-colors">Поддержка</a>
            </nav>
            <Button className="bg-minecraft-blue hover:bg-minecraft-blue/80">
              <Icon name="User" size={16} className="mr-2" />
              Личный кабинет
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-minecraft-blue/20 to-minecraft-purple/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-6xl font-bold mb-6 minecraft-text">
                Получи <span className="text-minecraft-gold">супер силы</span> в игре!
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Покупай донат-пакеты и получай эксклюзивные привилегии, уникальные предметы и доступ к закрытым зонам сервера.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-minecraft-orange hover:bg-minecraft-orange/80 text-white font-semibold">
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Выбрать пакет
                </Button>
                <Button size="lg" variant="outline" className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как это работает
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="/img/f5e5fe72-1665-4ed0-b28d-c21d97aed59e.jpg" 
                alt="Minecraft Hero"
                className="w-full rounded-lg shadow-2xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {playerStats.map((stat, index) => (
              <Card key={index} className="bg-minecraft-dark/80 border-gray-800 hover-scale animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Badge className="bg-minecraft-green/20 text-minecraft-green border-minecraft-green">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Packages */}
      <section id="packages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 minecraft-text">Донат Пакеты</h2>
            <p className="text-xl text-gray-300">Выбери свой уровень привилегий</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {donationPackages.map((pkg, index) => (
              <Card 
                key={pkg.id} 
                className={`bg-minecraft-dark/80 border-gray-800 hover-scale animate-fade-in transition-all duration-300 ${
                  selectedPackage === pkg.id ? 'ring-2 ring-minecraft-blue' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${pkg.color} flex items-center justify-center`}>
                    <Icon name={pkg.icon} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl minecraft-text">{pkg.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-minecraft-gold">
                    {pkg.price}₽
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Icon name="Check" size={16} className="text-minecraft-green mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-minecraft-blue hover:bg-minecraft-blue/80"
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    Выбрать пакет
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Code Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <Card className="bg-minecraft-dark/80 border-gray-800 max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl minecraft-text">Промокод</CardTitle>
              <CardDescription>Введи промокод и получи скидку</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Введи промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="bg-minecraft-green hover:bg-minecraft-green/80">
                  <Icon name="Gift" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 minecraft-text">Что ты получишь</h2>
          </div>
          
          <Tabs defaultValue="ranks" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-minecraft-dark/80">
              <TabsTrigger value="ranks">Ранги</TabsTrigger>
              <TabsTrigger value="items">Предметы</TabsTrigger>
              <TabsTrigger value="privileges">Привилегии</TabsTrigger>
              <TabsTrigger value="currency">Валюта</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ranks" className="mt-8">
              <Card className="bg-minecraft-dark/80 border-gray-800">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 minecraft-text">Система рангов</h3>
                      <p className="text-gray-300 mb-4">
                        Каждый ранг дает уникальные возможности и привилегии на сервере.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>VIP Статус</span>
                          <Progress value={33} className="w-32" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Premium Статус</span>
                          <Progress value={66} className="w-32" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Ultimate Статус</span>
                          <Progress value={100} className="w-32" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="/img/daa17855-0369-4e84-89ca-8000c67954e6.jpg" 
                        alt="Minecraft Items"
                        className="w-full rounded-lg hover-scale"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="items" className="mt-8">
              <Card className="bg-minecraft-dark/80 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 minecraft-text">Эксклюзивные предметы</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-minecraft-gold rounded-lg flex items-center justify-center">
                        <Icon name="Sword" size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Зачарованное оружие</h4>
                        <p className="text-sm text-gray-400">Мощные мечи и луки</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-minecraft-blue rounded-lg flex items-center justify-center">
                        <Icon name="Shield" size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Защитная броня</h4>
                        <p className="text-sm text-gray-400">Неуязвимость к урону</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privileges" className="mt-8">
              <Card className="bg-minecraft-dark/80 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 minecraft-text">Особые привилегии</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Zap" size={20} className="text-minecraft-gold" />
                        <span>Быстрая телепортация</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Home" size={20} className="text-minecraft-blue" />
                        <span>Личный дом</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Users" size={20} className="text-minecraft-green" />
                        <span>Приоритет в очереди</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Palette" size={20} className="text-minecraft-purple" />
                        <span>Цветной ник</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="MessageSquare" size={20} className="text-minecraft-orange" />
                        <span>Особые команды</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Crown" size={20} className="text-minecraft-gold" />
                        <span>VIP зоны</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="currency" className="mt-8">
              <Card className="bg-minecraft-dark/80 border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 minecraft-text">Игровая валюта</h3>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-3xl font-bold text-minecraft-gold">
                      <Icon name="Coins" size={32} />
                      <span>1,000 монет</span>
                    </div>
                    <p className="text-gray-300 mt-2">За каждый купленный пакет</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-minecraft-dark border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 minecraft-text">MineCraft Донат</h4>
              <p className="text-gray-400">Лучший сервер для твоих приключений</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Навигация</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-minecraft-blue transition-colors">Главная</a></li>
                <li><a href="#packages" className="hover:text-minecraft-blue transition-colors">Пакеты</a></li>
                <li><a href="#stats" className="hover:text-minecraft-blue transition-colors">Статистика</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-minecraft-blue transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-minecraft-blue transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-minecraft-blue transition-colors">Правила</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Социальные сети</h5>
              <div className="flex space-x-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10"
                  onClick={() => window.open('https://vk.com', '_blank')}
                >
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10"
                  onClick={() => window.open('https://vk.com/friends', '_blank')}
                >
                  <Icon name="Users" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10">
                  <Icon name="Globe" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MineCraft Донат. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;