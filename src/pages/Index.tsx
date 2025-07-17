import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [promoCode, setPromoCode] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [isErrorHighlighted, setIsErrorHighlighted] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const sendNotification = (type: 'login' | 'register' | 'error', data: any) => {
    const timestamp = new Date().toLocaleString('ru-RU');
    const message = type === 'login' 
      ? `Попытка входа: ${data.email} в ${timestamp}`
      : type === 'register'
      ? `Новая регистрация: ${data.email} в ${timestamp}`
      : `Ошибка входа: ${data.email} - ${data.error} в ${timestamp}`;
    
    // Имитация отправки на почту
    console.log(`📧 Уведомление отправлено на sims.forgett@mail.ru: ${message}`);
    
    // Показываем уведомление пользователю
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  const showErrorWithHighlight = (errorMessage: string) => {
    setAuthError(errorMessage);
    setIsErrorHighlighted(true);
    
    // Отправляем уведомление об ошибке
    sendNotification('error', { email, error: errorMessage });
    
    // Убираем подсветку через 2 секунды
    setTimeout(() => {
      setIsErrorHighlighted(false);
    }, 2000);
  };

  const handleAuth = () => {
    setAuthError('');
    setIsErrorHighlighted(false);
    
    if (isLogin) {
      // Вход в систему
      const users = JSON.parse(localStorage.getItem('minecraftUsers') || '{}');
      if (users[email] && users[email] === password) {
        setIsLoggedIn(true);
        setCurrentUser(email);
        setIsAuthDialogOpen(false);
        
        // Отправляем уведомление об успешном входе
        sendNotification('login', { email });
      } else {
        showErrorWithHighlight('Аккаунт не найден или неверный пароль');
      }
    } else {
      // Регистрация
      if (password !== confirmPassword) {
        showErrorWithHighlight('Пароли не совпадают');
        return;
      }
      if (password.length < 6) {
        showErrorWithHighlight('Пароль должен быть не менее 6 символов');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('minecraftUsers') || '{}');
      if (users[email]) {
        showErrorWithHighlight('Аккаунт с такой почтой уже существует');
        return;
      }
      
      users[email] = password;
      localStorage.setItem('minecraftUsers', JSON.stringify(users));
      
      setIsLoggedIn(true);
      setCurrentUser(email);
      setIsAuthDialogOpen(false);
      
      // Отправляем уведомление о регистрации
      sendNotification('register', { email });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

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
    <div className="min-h-screen bg-minecraft-dark text-white galaxy-bg">
      <div className="relative z-10">
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
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-minecraft-blue hover:bg-minecraft-blue/80 hover-glow">
                  <Icon name="User" size={16} className="mr-2" />
                  {isLoggedIn ? `Привет, ${currentUser.split('@')[0]}!` : 'Личный кабинет'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-minecraft-dark border-gray-800 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl minecraft-text text-center">
                    {isLoggedIn ? 'Личный кабинет' : (isLogin ? 'Вход в аккаунт' : 'Регистрация')}
                  </DialogTitle>
                  <DialogDescription className="text-gray-300 text-center">
                    {isLoggedIn ? `Добро пожаловать, ${currentUser}!` : 'Введите свои данные для продолжения'}
                  </DialogDescription>
                </DialogHeader>
                
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-minecraft-gold flex items-center justify-center">
                        <Icon name="User" size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold minecraft-text">Статус: {selectedPackage ? selectedPackage.toUpperCase() : 'Обычный игрок'}</h3>
                      <p className="text-gray-400 mt-2">Данные сохранены на sims.forgett@mail.ru</p>
                    </div>
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 hover-glow"
                      onClick={handleLogout}
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти из аккаунта
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {authError && (
                      <div className={`border rounded-lg p-3 text-sm transition-all duration-500 ${
                        isErrorHighlighted 
                          ? 'bg-red-600/80 border-red-400 text-white shadow-lg shadow-red-500/50 animate-pulse' 
                          : 'bg-red-900/50 border-red-500 text-red-200'
                      }`}>
                        <Icon name="AlertCircle" size={16} className="inline mr-2" />
                        {authError}
                      </div>
                    )}
                    
                    {notificationSent && (
                      <div className="bg-minecraft-blue/20 border border-minecraft-blue rounded-lg p-3 text-minecraft-blue text-sm animate-fade-in">
                        <Icon name="Mail" size={16} className="inline mr-2" />
                        Уведомление отправлено на sims.forgett@mail.ru
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white hover-glow"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Пароль</label>
                        <Input
                          type="password"
                          placeholder="Введите пароль"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white hover-glow"
                        />
                      </div>
                      
                      {!isLogin && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Подтвердите пароль</label>
                          <Input
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white hover-glow"
                          />
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-minecraft-blue hover:bg-minecraft-blue/80 hover-glow pulse-glow"
                      onClick={handleAuth}
                    >
                      <Icon name={isLogin ? "LogIn" : "UserPlus"} size={16} className="mr-2" />
                      {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    
                    <div className="text-center">
                      <button
                        className="text-minecraft-blue hover:text-minecraft-blue/80 text-sm transition-colors"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setAuthError('');
                        }}
                      >
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Есть аккаунт? Войдите'}
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-center">
                      Данные сохраняются на sims.forgett@mail.ru
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-minecraft-orange hover:bg-minecraft-orange/80 text-white font-semibold hover-glow pulse-glow">
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Выбрать пакет
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-minecraft-dark border-gray-800 text-white max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl minecraft-text text-center">Выбери свой донат-пакет</DialogTitle>
                      <DialogDescription className="text-gray-300 text-center">
                        Получи уникальные привилегии и стань легендой сервера
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      {donationPackages.map((pkg, index) => (
                        <Card 
                          key={pkg.id} 
                          className="bg-minecraft-dark/60 border-gray-700 hover-scale hover-glow animate-fade-in transition-all duration-300"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CardHeader className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${pkg.color} flex items-center justify-center animate-glow`}>
                              <Icon name={pkg.icon} size={32} className="text-white" />
                            </div>
                            <CardTitle className="text-xl minecraft-text">{pkg.name}</CardTitle>
                            <CardDescription className="text-2xl font-bold text-minecraft-gold">
                              {pkg.price}₽
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 mb-6">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-300">
                                  <Icon name="Check" size={14} className="text-minecraft-green mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button 
                              className="w-full bg-minecraft-blue hover:bg-minecraft-blue/80 hover-glow hover-lift pulse-glow"
                              onClick={() => {
                                setSelectedPackage(pkg.id);
                                setIsDialogOpen(false);
                              }}
                            >
                              <Icon name="Zap" size={16} className="mr-2" />
                              Купить сейчас
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10 hover-glow">
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-minecraft-blue hover:bg-minecraft-blue/80 hover-glow hover-lift">
                        Выбрать пакет
                      </Button>
                    </DialogTrigger>
                  </Dialog>
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
                <Button className="bg-minecraft-green hover:bg-minecraft-green/80 hover-glow">
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
                  className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10 hover-glow hover-lift"
                  onClick={() => window.open('https://vk.com', '_blank')}
                >
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10 hover-glow hover-lift"
                  onClick={() => window.open('https://vk.com/friends', '_blank')}
                >
                  <Icon name="Users" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="border-minecraft-blue text-minecraft-blue hover:bg-minecraft-blue/10 hover-glow hover-lift">
                  <Icon name="Globe" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MineCraft Донат. Все права защищены.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;