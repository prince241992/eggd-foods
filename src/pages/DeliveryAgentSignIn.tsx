
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, Mail, Lock, User, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const DeliveryAgentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  
  // Signup form
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    setPasswordStrength(score);
    return score;
  };
  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };
  
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    toast({
      title: "Login Successful",
      description: "Welcome back to Egg'd Foods Delivery!",
    });
  };
  
  const handleRequestOTP = () => {
    // Validate form fields
    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password || !signupForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Check if passwords match
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // Check password strength
    if (passwordStrength < 50) {
      toast({
        title: "Weak Password",
        description: "Please use a stronger password with uppercase letters, numbers, and special characters",
        variant: "destructive"
      });
      return;
    }
    
    // Send OTP logic would go here
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${signupForm.email} and ${signupForm.phone}`,
    });
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OTP
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        variant: "destructive"
      });
      return;
    }
    
    // Registration logic would go here
    toast({
      title: "Success",
      description: "Your Delivery Hero account has been created successfully",
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600">
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto bg-black/90 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
            Delivery Hero Portal
          </h1>
          
          <Tabs 
            defaultValue="signin" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 rounded-none bg-yellow-800/20 mb-6">
              <TabsTrigger value="signin" className="text-yellow-300">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-yellow-300">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-yellow-400 block mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-yellow-500/60" />
                    </div>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black border-yellow-400 text-white pl-10"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-yellow-400 block mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-yellow-500/60" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black border-yellow-400 text-white pl-10 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-yellow-500/60" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-yellow-500/60" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                >
                  Sign In
                </Button>
                
                <div className="flex items-center justify-between">
                  <hr className="w-1/3 border-yellow-700" />
                  <p className="text-yellow-500 text-sm px-2">or continue with</p>
                  <hr className="w-1/3 border-yellow-700" />
                </div>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-800/20"
                >
                  <Mail className="h-5 w-5 mr-2" /> Sign in with Gmail
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                {!otpSent ? (
                  <>
                    <div>
                      <label className="text-yellow-400 block mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-yellow-500/60" />
                        </div>
                        <Input
                          type="text"
                          name="name"
                          value={signupForm.name}
                          onChange={handleSignupChange}
                          className="bg-black border-yellow-400 text-white pl-10"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-yellow-400 block mb-2">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-yellow-500/60" />
                        </div>
                        <Input
                          type="email"
                          name="email"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          className="bg-black border-yellow-400 text-white pl-10"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-yellow-400 block mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-yellow-500/60" />
                        </div>
                        <Input
                          type="tel"
                          name="phone"
                          value={signupForm.phone}
                          onChange={handleSignupChange}
                          className="bg-black border-yellow-400 text-white pl-10"
                          placeholder="+91 98xxxxxxxx"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-yellow-400 block mb-2">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-yellow-500/60" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          className="bg-black border-yellow-400 text-white pl-10 pr-10"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5 text-yellow-500/60" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-yellow-500/60" />
                          )}
                        </button>
                      </div>
                      
                      <div className="mt-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-yellow-400">Password strength:</span>
                          <span 
                            className={
                              passwordStrength <= 25 ? "text-red-400" :
                              passwordStrength <= 50 ? "text-yellow-400" :
                              passwordStrength <= 75 ? "text-blue-400" :
                              "text-green-400"
                            }
                          >
                            {getPasswordStrengthLabel()}
                          </span>
                        </div>
                        <Progress 
                          value={passwordStrength} 
                          className={`h-1 mt-1 ${getPasswordStrengthColor()}`} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-yellow-400 block mb-2">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-yellow-500/60" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={signupForm.confirmPassword}
                          onChange={handleSignupChange}
                          className="bg-black border-yellow-400 text-white pl-10"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      {signupForm.password && signupForm.confirmPassword && signupForm.password !== signupForm.confirmPassword && (
                        <p className="text-xs text-red-400 mt-1">
                          Passwords do not match
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      type="button"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold mt-2"
                      onClick={handleRequestOTP}
                    >
                      Request Verification Code <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center justify-between mt-4">
                      <hr className="w-1/3 border-yellow-700" />
                      <p className="text-yellow-500 text-sm px-2">or continue with</p>
                      <hr className="w-1/3 border-yellow-700" />
                    </div>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-800/20"
                    >
                      <Mail className="h-5 w-5 mr-2" /> Sign up with Gmail
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="bg-yellow-800/20 border border-yellow-600/20 rounded-md p-4 mb-4">
                      <div className="flex">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 mr-2" />
                        <div>
                          <p className="text-yellow-300 font-medium">Verification code sent!</p>
                          <p className="text-yellow-400 text-sm">
                            We've sent a 6-digit code to your email and phone number.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-yellow-400 block mb-2">Enter Verification Code (OTP)</label>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="bg-black border-yellow-400 text-yellow-400" />
                            <InputOTPSlot index={1} className="bg-black border-yellow-400 text-yellow-400" />
                            <InputOTPSlot index={2} className="bg-black border-yellow-400 text-yellow-400" />
                            <InputOTPSlot index={3} className="bg-black border-yellow-400 text-yellow-400" />
                            <InputOTPSlot index={4} className="bg-black border-yellow-400 text-yellow-400" />
                            <InputOTPSlot index={5} className="bg-black border-yellow-400 text-yellow-400" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs mt-2">
                      <button 
                        type="button" 
                        className="text-yellow-400 hover:text-yellow-300"
                        onClick={() => setOtpSent(false)}
                      >
                        Change Details
                      </button>
                      <button 
                        type="button" 
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        Resend Code
                      </button>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold mt-4"
                    >
                      Create Account
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
          </Tabs>
          
          <p className="text-yellow-400 text-sm text-center mt-6">
            Contact your supervisor if you're having trouble logging in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentSignIn;
