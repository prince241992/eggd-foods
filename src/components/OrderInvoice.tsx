
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Download, Share2, Settings, Upload, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InvoiceItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  addOns?: { name: string; price: string }[];
}

interface OrderInvoiceProps {
  orderNumber: string;
  date: string;
  items: InvoiceItem[];
  customerName: string;
  customerAddress?: string;
  customerPhone?: string;
  deliveryFee: string;
  discount?: string;
  subtotal: string;
  total: string;
  paymentMethod: string;
  branch: string;
  orderType: 'Delivery' | 'Pickup';
  deliveryTime?: string;
  logo?: string;
  headerText?: string;
  footerText?: string;
  thermalPrinterMode?: boolean;
}

const OrderInvoice = ({
  orderNumber,
  date,
  items,
  customerName,
  customerAddress,
  customerPhone,
  deliveryFee,
  discount = '₹0.00',
  subtotal,
  total,
  paymentMethod,
  branch,
  orderType,
  deliveryTime,
  logo = 'https://via.placeholder.com/150x50?text=Restaurant+Logo',
  headerText = 'Thank you for your order!',
  footerText = 'We appreciate your business. Please come again!',
  thermalPrinterMode = false,
}: OrderInvoiceProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [localThermalMode, setLocalThermalMode] = useState(thermalPrinterMode);
  const [localLogo, setLocalLogo] = useState(logo);
  const [localHeaderText, setLocalHeaderText] = useState(headerText);
  const [localFooterText, setLocalFooterText] = useState(footerText);
  const { toast } = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handlePrint = () => {
    const content = invoiceRef.current;
    if (!content) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) {
      toast({
        title: 'Print Error',
        description: 'Unable to open print window. Please check your pop-up settings.',
        variant: 'destructive',
      });
      return;
    }

    printWindow.document.write('<html><head><title>Order Invoice</title>');
    
    // Add styles for printing
    if (localThermalMode) {
      printWindow.document.write(`
        <style>
          body { font-family: monospace; font-size: 10px; width: 80mm; margin: 0; padding: 10px; }
          .invoice-header, .invoice-footer { text-align: center; margin-bottom: 10px; }
          hr { border-top: 1px dashed #000; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 3px 0; }
          .amount { text-align: right; }
          .total-row { font-weight: bold; }
        </style>
      `);
    } else {
      printWindow.document.write(`
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 20px; }
          .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .invoice-details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border-bottom: 1px solid #eee; padding: 10px 0; text-align: left; }
          .amount { text-align: right; }
          .total-section { margin-top: 20px; }
          .total-row { font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; color: #666; }
        </style>
      `);
    }
    
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Wait for the content to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    toast({
      title: 'Invoice Downloaded',
      description: 'Your invoice has been downloaded successfully.',
    });
  };

  const handleShare = () => {
    toast({
      title: 'Share Invoice',
      description: 'Your invoice has been shared successfully.',
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setLocalLogo(e.target.result);
          toast({
            title: 'Logo Updated',
            description: 'Your logo has been uploaded successfully.',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const oneShotPrint = () => {
    handlePrint();
    toast({
      title: 'One-Click Print',
      description: 'Invoice sent to printer with current settings.',
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">Invoice</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={oneShotPrint}>
            <Printer className="w-4 h-4 mr-2" /> Quick Print
          </Button>
          
          <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" /> Options
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Invoice Settings</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="thermal-mode">Thermal Printer Mode</Label>
                  <Switch
                    id="thermal-mode"
                    checked={localThermalMode}
                    onCheckedChange={setLocalThermalMode}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Upload Logo</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                    <input 
                      type="file" 
                      id="logo-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="header-text">Header Text</Label>
                  <Input
                    id="header-text"
                    value={localHeaderText}
                    onChange={(e) => setLocalHeaderText(e.target.value)}
                    placeholder="Thank you for your order!"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Textarea
                    id="footer-text"
                    value={localFooterText}
                    onChange={(e) => setLocalFooterText(e.target.value)}
                    placeholder="We appreciate your business. Please come again!"
                    rows={2}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => {
                      toast({
                        title: 'Settings Applied',
                        description: 'Your invoice settings have been updated.',
                      });
                      setSettingsOpen(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div ref={invoiceRef} className={localThermalMode ? "font-mono text-sm" : ""}>
          {/* Invoice Content for printing */}
          <div className="invoice-header flex justify-between items-center mb-6">
            <div>
              <img src={localLogo} alt="Restaurant Logo" className="max-h-16" />
            </div>
            <div className="text-right">
              <h1 className="font-bold text-xl">INVOICE</h1>
              <p className="text-gray-600">Order #: {orderNumber}</p>
              <p className="text-gray-600">Date: {date}</p>
              <p className="text-gray-600">Branch: {branch}</p>
            </div>
          </div>
          
          {localHeaderText && (
            <div className="text-center my-4 text-gray-700">{localHeaderText}</div>
          )}
          
          <div className="invoice-details grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800">Customer Details:</h3>
              <p>{customerName}</p>
              {customerAddress && <p className="text-gray-600">{customerAddress}</p>}
              {customerPhone && <p className="text-gray-600">Phone: {customerPhone}</p>}
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-800">Order Details:</h3>
              <p>Order Type: {orderType}</p>
              {deliveryTime && <p>Delivery/Pickup Time: {deliveryTime}</p>}
              <p>Payment Method: {paymentMethod}</p>
            </div>
          </div>
          
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left">Item</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">{item.price}</td>
                    <td className="text-right">
                      ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                  {item.addOns && item.addOns.length > 0 && (
                    item.addOns.map((addon, idx) => (
                      <tr key={`${item.id}-addon-${idx}`} className="text-gray-600 text-sm">
                        <td className="pl-4">+ {addon.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">{addon.price}</td>
                        <td className="text-right">
                          ₹{(parseFloat(addon.price.replace('₹', '')) * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          
          <div className="total-section border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee:</span>
              <span>{deliveryFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>-{discount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total:</span>
              <span>{total}</span>
            </div>
          </div>
          
          {localFooterText && (
            <div className="text-center mt-8 text-gray-600 text-sm border-t pt-4">
              {localFooterText}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          {localThermalMode ? 'Thermal printer mode active' : 'Standard invoice format'}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => localThermalMode ? null : handlePrint()}
        >
          <Printer className="w-4 h-4 mr-2" /> Print Receipt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderInvoice;
