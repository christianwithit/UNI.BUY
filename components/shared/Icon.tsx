import React from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  // Map icon names to their respective libraries
  const iconMap: { [key: string]: { library: any; iconName: string } } = {
    // Navigation
    'menu': { library: Feather, iconName: 'menu' },
    'search': { library: Feather, iconName: 'search' },
    'filter': { library: Feather, iconName: 'sliders' },
    'back': { library: Ionicons, iconName: 'arrow-back' },
    'close': { library: Ionicons, iconName: 'close' },
    'arrow-right': { library: Feather, iconName: 'arrow-right' },
    'chevron-down': { library: Feather, iconName: 'chevron-down' },
    'chevron-right': { library: Feather, iconName: 'chevron-right' },
    
    // Actions
    'heart': { library: Feather, iconName: 'heart' },
    'heart-filled': { library: Ionicons, iconName: 'heart' },
    'share': { library: Feather, iconName: 'share-2' },
    'plus': { library: Feather, iconName: 'plus' },
    'edit': { library: Feather, iconName: 'edit-2' },
    'trash': { library: Feather, iconName: 'trash-2' },
    'check': { library: Feather, iconName: 'check' },
    'checkmark-circle': { library: Ionicons, iconName: 'checkmark-circle' },
    'eye': { library: Feather, iconName: 'eye' },
    'eye-off': { library: Feather, iconName: 'eye-off' },
    
    // Bottom Navigation
    'home': { library: Feather, iconName: 'home' },
    'home-filled': { library: Ionicons, iconName: 'home' },
    'sell': { library: Feather, iconName: 'plus-circle' },
    'messages': { library: Feather, iconName: 'message-circle' },
    'messages-filled': { library: Ionicons, iconName: 'chatbubble' },
    'profile': { library: Feather, iconName: 'user' },
    'profile-filled': { library: Ionicons, iconName: 'person' },
    
    // Content
    'location': { library: Feather, iconName: 'map-pin' },
    'clock': { library: Feather, iconName: 'clock' },
    'calendar': { library: Feather, iconName: 'calendar' },
    'camera': { library: Feather, iconName: 'camera' },
    'image': { library: Feather, iconName: 'image' },
    'phone': { library: Feather, iconName: 'phone' },
    'mail': { library: Feather, iconName: 'mail' },
    'settings': { library: Feather, iconName: 'settings' },
    'bell': { library: Feather, iconName: 'bell' },
    'star': { library: Feather, iconName: 'star' },
    'star-filled': { library: Ionicons, iconName: 'star' },
    'shopping-bag': { library: Feather, iconName: 'shopping-bag' },
    'person': { library: Ionicons, iconName: 'person' },
    'at': { library: Ionicons, iconName: 'at' },
    'lock': { library: Feather, iconName: 'lock' },
    'shield': { library: Feather, iconName: 'shield' },
    'logo-google': { library: Ionicons, iconName: 'logo-google' },
    'logo-apple': { library: Ionicons, iconName: 'logo-apple' },
    
    // Categories
    'smartphone': { library: Feather, iconName: 'smartphone' },
    'laptop': { library: Feather, iconName: 'monitor' },
    'tv': { library: Feather, iconName: 'tv' },
    'tablet': { library: Feather, iconName: 'tablet' },
    'headphones': { library: Feather, iconName: 'headphones' },
    'package': { library: Feather, iconName: 'package' },
    
    // Payment
    'credit-card': { library: Feather, iconName: 'credit-card' },
    'dollar': { library: Feather, iconName: 'dollar-sign' },
    
    // Social
    'whatsapp': { library: MaterialCommunityIcons, iconName: 'whatsapp' },
    'facebook': { library: Feather, iconName: 'facebook' },
    'instagram': { library: Feather, iconName: 'instagram' },
    
    // Info
    'info': { library: Feather, iconName: 'info' },
    'alert': { library: Feather, iconName: 'alert-circle' },
    'help': { library: Feather, iconName: 'help-circle' },
  };

  const iconConfig = iconMap[name];
  
  if (!iconConfig) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  const IconComponent = iconConfig.library;
  
  return <IconComponent name={iconConfig.iconName} size={size} color={color} style={style} />;
};

export default Icon;
