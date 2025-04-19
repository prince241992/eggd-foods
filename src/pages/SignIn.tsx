
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Apple, ArrowRight, Mail, Phone } from "lucide-react";

const SignIn = () => {
  const [userType, setUserType] = useState<"customer" | "delivery">("customer");
  const [authMode, setAuthMode] = useState<"email" | "phone" | "social">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This is a mock authentication - would be replaced with actual auth
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: `${userType.charAt(0).toUpperCase() + userType.slice(1)} signed in!`,
        description: `Welcome back! ${userType === 'delivery' ? 'Your delivery dashboard is ready.' : 'Enjoy your food ordering experience.'}`,
        duration: 3000,
      });
      
      // Redirect based on user type
      if (userType === "delivery") {
        navigate("/delivery-dashboard");
      } else {
        navigate("/menu");
      }
    }, 1500);
  };
  
  const handleSocialAuth = (provider: "google" | "apple") => {
    setLoading(true);
    
    toast({
      title: `Connecting to ${provider}...`,
      description: "Please wait while we connect to your account",
      duration: 2000,
    });
    
    // Mock social authentication
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Authentication successful!",
        description: `You've been signed in with ${provider}`,
        duration: 3000,
      });
      
      navigate(userType === "delivery" ? "/delivery-dashboard" : "/menu");
    }, 2000);
  };
  
  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    
    // Mock OTP sending
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      
      toast({
        title: "OTP Sent!",
        description: `A verification code has been sent to ${phone}`,
        duration: 3000,
      });
    }, 1500);
  };
  
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete OTP",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    
    // Mock OTP verification
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Verification Successful!",
        description: "Your phone number has been verified",
        duration: 3000,
      });
      
      navigate(userType === "delivery" ? "/delivery-dashboard" : "/menu");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-cream-50 py-16">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              {isSignUp ? "Create Account" : "Welcome Back"} - <span className="text-sweet-600">Egg'd Foods</span>
            </h1>
            
            <Tabs defaultValue="customer" onValueChange={(value) => setUserType(value as "customer" | "delivery")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="delivery">Delivery Partner</TabsTrigger>
              </TabsList>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    className={`text-sm font-medium ${!isSignUp ? "text-sweet-600 border-b-2 border-sweet-600" : "text-gray-500"}`}
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </button>
                  <button 
                    className={`text-sm font-medium ${isSignUp ? "text-sweet-600 border-b-2 border-sweet-600" : "text-gray-500"}`}
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </button>
                </div>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    type="button"
                    className={`py-2 px-4 rounded-md flex items-center justify-center w-1/3 ${authMode === "email" ? "bg-sweet-600 text-white" : "bg-gray-100 text-gray-700"}`}
                    onClick={() => setAuthMode("email")}
                  >
                    <Mail size={18} className="mr-2" />
                    Email
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 rounded-md flex items-center justify-center w-1/3 ${authMode === "phone" ? "bg-sweet-600 text-white" : "bg-gray-100 text-gray-700"}`}
                    onClick={() => {
                      setAuthMode("phone");
                      setOtpSent(false);
                    }}
                  >
                    <Phone size={18} className="mr-2" />
                    Phone
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 rounded-md flex items-center justify-center w-1/3 ${authMode === "social" ? "bg-sweet-600 text-white" : "bg-gray-100 text-gray-700"}`}
                    onClick={() => setAuthMode("social")}
                  >
                    Social
                  </button>
                </div>
              </div>
              
              <TabsContent value="customer">
                {authMode === "email" && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="youremail@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-sweet-600 hover:bg-sweet-700"
                        disabled={loading}
                      >
                        {loading ? `${isSignUp ? "Creating Account..." : "Signing in..."}` : isSignUp ? "Create Account" : "Sign In"}
                      </Button>
                    </div>
                    
                    {!isSignUp && (
                      <div className="text-center text-sm text-gray-600">
                        <p><a href="#" className="text-sweet-600 hover:underline">Forgot password?</a></p>
                      </div>
                    )}
                  </form>
                )}
                
                {authMode === "phone" && (
                  <>
                    {!otpSent ? (
                      <form onSubmit={handleSendOTP} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            required 
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-sweet-600 hover:bg-sweet-700"
                            disabled={loading}
                          >
                            {loading ? "Sending OTP..." : "Send OTP"}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp" className="block text-center mb-2">Enter verification code sent to {phone}</Label>
                          <div className="flex justify-center">
                            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          
                          <p className="text-sm text-center mt-2">
                            <button 
                              type="button" 
                              className="text-sweet-600 hover:underline"
                              onClick={() => setOtpSent(false)}
                            >
                              Change phone number
                            </button>
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-sweet-600 hover:bg-sweet-700"
                            disabled={loading || otp.length < 6}
                          >
                            {loading ? "Verifying..." : "Verify & Continue"}
                          </Button>
                        </div>
                      </form>
                    )}
                  </>
                )}
                
                {authMode === "social" && (
                  <div className="space-y-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialAuth("google")}
                      disabled={loading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        <path fill="currentColor" d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Continue with Google
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialAuth("apple")}
                      disabled={loading}
                    >
                      <Apple className="w-5 h-5 mr-2" />
                      Continue with Apple
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="delivery">
                {authMode === "email" && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="delivery-email">Email</Label>
                      <Input 
                        id="delivery-email" 
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery-password">Password</Label>
                      <Input 
                        id="delivery-password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-sweet-600 hover:bg-sweet-700"
                        disabled={loading}
                      >
                        {loading ? `${isSignUp ? "Creating Account..." : "Signing in..."}` : isSignUp ? "Create Account" : "Sign In"}
                      </Button>
                    </div>
                  </form>
                )}
                
                {authMode === "phone" && (
                  <>
                    {!otpSent ? (
                      <form onSubmit={handleSendOTP} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="delivery-phone">Phone Number</Label>
                          <Input 
                            id="delivery-phone" 
                            type="tel" 
                            placeholder="Your registered phone number" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required 
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-sweet-600 hover:bg-sweet-700"
                            disabled={loading}
                          >
                            {loading ? "Sending OTP..." : "Send OTP"}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="delivery-otp" className="block text-center mb-2">Enter verification code sent to {phone}</Label>
                          <div className="flex justify-center">
                            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          
                          <p className="text-sm text-center mt-2">
                            <button 
                              type="button" 
                              className="text-sweet-600 hover:underline"
                              onClick={() => setOtpSent(false)}
                            >
                              Change phone number
                            </button>
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-sweet-600 hover:bg-sweet-700"
                            disabled={loading || otp.length < 6}
                          >
                            {loading ? "Verifying..." : "Verify & Continue"}
                          </Button>
                        </div>
                      </form>
                    )}
                  </>
                )}
                
                {authMode === "social" && (
                  <div className="space-y-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialAuth("google")}
                      disabled={loading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        <path fill="currentColor" d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Continue with Google
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialAuth("apple")}
                      disabled={loading}
                    >
                      <Apple className="w-5 h-5 mr-2" />
                      Continue with Apple
                    </Button>
                  </div>
                )}
                
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-medium text-gray-800">Delivery Partner Benefits:</h3>
                  <ul className="text-sm text-gray-600 list-disc pl-5 mt-2">
                    <li>₹6 per kilometer incentive</li>
                    <li>Real-time delivery tracking</li>
                    <li>Flexible working hours</li>
                    <li>Weekly payments</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;

