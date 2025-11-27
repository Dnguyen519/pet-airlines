import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'playful';
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  icon,
  onClose,
  className
}) => {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-orange-50 border-orange-200 text-orange-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    playful: 'bg-gradient-to-r from-pet-light to-white border-pet-blue text-pet-navy'
  };
  
  const defaultIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    playful: '✈️'
  };
  
  return (
    <div className={cn(
      'relative flex items-start gap-3 p-4 rounded-pet border-2',
      variants[variant],
      className
    )}>
      <span className="text-xl flex-shrink-0">{icon || defaultIcons[variant]}</span>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Toast: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}> = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-pet-blue'
  };
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };
  
  return (
    <div className={cn(
      'flex items-center gap-3 px-6 py-4 rounded-pet text-white shadow-xl transform transition-all duration-300 animate-slide-in',
      types[type]
    )}>
      <span className="text-xl">{icons[type]}</span>
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="hover:opacity-70">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export const Banner: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'promotional' | 'warning';
  onClose?: () => void;
}> = ({ children, variant = 'default', onClose }) => {
  const variants = {
    default: 'bg-pet-light text-pet-navy',
    promotional: 'bg-gradient-to-r from-pet-orange to-orange-500 text-white',
    warning: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <div className={cn('relative overflow-hidden', variants[variant])}>
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center gap-3">
            {variant === 'promotional' && (
              <span className="text-2xl animate-bounce">🎉</span>
            )}
            {children}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-70 transition-opacity ml-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {variant === 'promotional' && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-20">
          <span className="text-8xl">✈️</span>
        </div>
      )}
    </div>
  );
};

export const Notification: React.FC<{
  title: string;
  message: string;
  avatar?: string;
  time?: string;
  unread?: boolean;
}> = ({ title, message, avatar, time, unread = false }) => {
  return (
    <div className={cn(
      'flex gap-4 p-4 rounded-pet hover:bg-pet-light/50 transition-colors cursor-pointer',
      unread && 'bg-pet-light/30'
    )}>
      <div className="flex-shrink-0">
        {avatar ? (
          <img src={avatar} alt="" className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 bg-pet-blue rounded-full flex items-center justify-center text-white font-bold">
            {title[0]}
          </div>
        )}
        {unread && (
          <div className="w-3 h-3 bg-pet-orange rounded-full absolute -mt-1 -ml-1 animate-pulse" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <p className="font-semibold text-pet-navy">{title}</p>
          {time && <span className="text-sm text-gray-500">{time}</span>}
        </div>
        <p className="text-gray-600 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};

export const FlyingNotification: React.FC<{
  message: string;
}> = ({ message }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-8 right-8 max-w-sm animate-fly-in">
      <div className="bg-white rounded-pet shadow-2xl p-6 border-2 border-pet-light">
        <div className="flex items-start gap-4">
          <div className="text-4xl animate-float">✈️</div>
          <div>
            <p className="font-bold text-pet-navy mb-1">Flight Update</p>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const AlertShowcase: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Alert Variations</h3>
        <div className="space-y-3">
          <Alert variant="info">
            Your pet's flight is scheduled for tomorrow at 10:00 AM.
          </Alert>
          <Alert variant="success">
            Booking confirmed! Check your email for details.
          </Alert>
          <Alert variant="warning" onClose={() => {}}>
            Please arrive 2 hours before departure for pet check-in.
          </Alert>
          <Alert variant="error">
            Unable to process payment. Please try again.
          </Alert>
          <Alert variant="playful">
            <strong>Woof!</strong> Your furry friend is ready for their adventure!
          </Alert>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Notifications</h3>
        <div className="space-y-2 bg-white rounded-pet p-4">
          <Notification
            title="Flight Reminder"
            message="Max's flight NYC → LAX departs in 24 hours"
            time="1h ago"
            unread={true}
          />
          <Notification
            title="Special Offer"
            message="20% off your next pet flight booking!"
            time="3h ago"
          />
          <Notification
            title="Weather Update"
            message="Clear skies expected for tomorrow's flight"
            time="1d ago"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Promotional Banner</h3>
        <Banner variant="promotional" onClose={() => {}}>
          <p className="font-bold">Limited Time: Free pet carrier with premium bookings!</p>
        </Banner>
      </div>
    </div>
  );
};