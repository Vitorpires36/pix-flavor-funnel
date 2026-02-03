import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  text: string;
  isBot: boolean;
  options?: string[];
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! 👋 Bem-vindo à PODE POD! Como posso te ajudar hoje?',
      isBot: true,
      options: [
        'Ver produtos',
        'Dúvidas sobre entrega',
        'Formas de pagamento',
        'Falar com atendente'
      ]
    }
  ]);

  const responses: Record<string, Message> = {
    'Ver produtos': {
      text: 'Ótimo! Temos pods descartáveis e juices premium. Navegue pela nossa loja acima para ver todos os produtos. Posso ajudar com mais alguma coisa?',
      isBot: true,
      options: ['Dúvidas sobre entrega', 'Formas de pagamento', 'Falar com atendente']
    },
    'Dúvidas sobre entrega': {
      text: 'Entregamos em toda a região! 🚚\n\n• Entrega grátis acima de R$ 100\n• Prazo: 1-2 dias úteis\n• Rastreamento em tempo real\n\nO que mais posso te ajudar?',
      isBot: true,
      options: ['Ver produtos', 'Formas de pagamento', 'Falar com atendente']
    },
    'Formas de pagamento': {
      text: 'Aceitamos:\n\n💳 PIX (Aprovação instantânea)\n💰 Dinheiro na entrega\n\nTudo muito fácil e seguro! Mais alguma dúvida?',
      isBot: true,
      options: ['Ver produtos', 'Dúvidas sobre entrega', 'Falar com atendente']
    },
    'Falar com atendente': {
      text: 'Claro! Vou te direcionar para nosso WhatsApp onde um atendente humano vai te ajudar! 😊',
      isBot: true,
      options: []
    }
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { text: option, isBot: false }]);
    
    setTimeout(() => {
      const response = responses[option];
      if (response) {
        setMessages(prev => [...prev, response]);
        
        if (option === 'Falar com atendente') {
          setTimeout(() => {
            window.open('https://wa.me/5511981878093?text=Olá! Vim pelo chatbot e preciso de ajuda.', '_blank');
          }, 1000);
        }
      }
    }, 500);
  };

  return (
    <>
      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Janela do chat */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-24 right-6 w-96 h-[500px] shadow-glow border-border z-50",
          "flex flex-col bg-card overflow-hidden"
        )}>
          {/* Header */}
          <div className="gradient-primary p-4 text-white">
            <h3 className="font-bold text-lg">Atendimento PODE POD</h3>
            <p className="text-sm opacity-90">Online agora</p>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg p-3 text-sm',
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground ml-auto'
                  )}
                  style={{
                    marginLeft: message.isBot ? '0' : 'auto',
                    marginRight: message.isBot ? 'auto' : '0'
                  }}
                >
                  {message.text}
                </div>

                {message.options && message.options.length > 0 && (
                  <div className="space-y-2">
                    {message.options.map((option, optIndex) => (
                      <Button
                        key={optIndex}
                        onClick={() => handleOptionClick(option)}
                        variant="outline"
                        className="w-full justify-start text-left hover:bg-primary hover:text-primary-foreground"
                        size="sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input (desabilitado - apenas opções) */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Use os botões acima..."
                disabled
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-md text-muted-foreground cursor-not-allowed"
              />
              <Button size="icon" disabled>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
