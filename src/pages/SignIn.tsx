
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Mail, Lock, User, Phone, ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  // Form states
  const [signinForm, setSigninForm] = useState({ 
    email: "", 
    password: "",
  });
  
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    otp: ""
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
  
  // Handle sign-in form change
  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle sign-up form change
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };
  
  // Handle sign-in submission
  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!signinForm.email || !signinForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Authentication logic would go here
    toast({
      title: "Success",
      description: "You have successfully signed in",
      duration: 2000
    });
    
    navigate("/account");
  };
  
  // Handle OTP request for sign-up
  const handleRequestOTP = () => {
    // Validate form fields
    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password || !signupForm.confirmPassword || !signupForm.birthdate) {
      toast({
        title: "Error",
        description: "Please fill in all fields including birthdate",
        variant: "destructive"
      });
      return;
    }
    
    // Check if birthdate is valid
    const birthDate = new Date(signupForm.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (isNaN(birthDate.getTime()) || age < 13) {
      toast({
        title: "Error",
        description: "Please enter a valid birthdate. You must be at least 13 years old.",
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
  
  // Handle sign-up submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OTP
    if (!signupForm.otp || signupForm.otp.length !== 6) {
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
      description: "Your account has been created successfully",
      duration: 2000
    });
    
    navigate("/account");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-display">
            Egg'd Foods
          </h1>
          <p className="mt-2 text-gray-600">
            {activeTab === "signin" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>
        
        <Card className="overflow-hidden shadow-lg border-0">
          <CardContent className="p-0">
            <Tabs 
              defaultValue="signin" 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 rounded-none bg-gray-100">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                {/* Sign In Form */}
                <TabsContent value="signin">
                  <form onSubmit={handleSignin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="email"
                          name="email"
                          value={signinForm.email}
                          onChange={handleSigninChange}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={signinForm.password}
                          onChange={handleSigninChange}
                          placeholder="••••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="text-right mt-1">
                        <a href="#" className="text-xs text-purple-600 hover:text-purple-500">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Sign Up Form */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    {!otpSent ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="text"
                              name="name"
                              value={signupForm.name}
                              onChange={handleSignupChange}
                              placeholder="John Doe"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="email"
                              name="email"
                              value={signupForm.email}
                              onChange={handleSignupChange}
                              placeholder="your@email.com"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="tel"
                              name="phone"
                              value={signupForm.phone}
                              onChange={handleSignupChange}
                              placeholder="+91 98xxxxxxxx"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type="date"
                              name="birthdate"
                              value={signupForm.birthdate}
                              onChange={handleSignupChange}
                              className="pl-10"
                              required
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Your birthdate will be used for birthday specials and can't be changed later
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={signupForm.password}
                              onChange={handleSignupChange}
                              placeholder="••••••••••"
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                          
                          <div className="mt-1">
                            <div className="flex justify-between items-center text-xs">
                              <span>Password strength:</span>
                              <span 
                                className={
                                  passwordStrength <= 25 ? "text-red-600" :
                                  passwordStrength <= 50 ? "text-yellow-600" :
                                  passwordStrength <= 75 ? "text-blue-600" :
                                  "text-green-600"
                                }
                              >
                                {getPasswordStrengthLabel()}
                              </span>
                            </div>
                            <Progress 
                              value={passwordStrength} 
                              className={`h-1 mt-1 ${getPasswordStrengthColor()}`} 
                            />
                            
                            {signupForm.password && (
                              <div className="grid grid-cols-2 gap-1 mt-2">
                                <div className="flex items-center text-xs">
                                  <CheckCircle2 
                                    className={`h-3 w-3 mr-1 ${
                                      signupForm.password.length >= 8 ? "text-green-500" : "text-gray-300"
                                    }`} 
                                  />
                                  <span>8+ characters</span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <CheckCircle2 
                                    className={`h-3 w-3 mr-1 ${
                                      /[A-Z]/.test(signupForm.password) ? "text-green-500" : "text-gray-300"
                                    }`} 
                                  />
                                  <span>Uppercase</span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <CheckCircle2 
                                    className={`h-3 w-3 mr-1 ${
                                      /[0-9]/.test(signupForm.password) ? "text-green-500" : "text-gray-300"
                                    }`} 
                                  />
                                  <span>Number</span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <CheckCircle2 
                                    className={`h-3 w-3 mr-1 ${
                                      /[^A-Za-z0-9]/.test(signupForm.password) ? "text-green-500" : "text-gray-300"
                                    }`} 
                                  />
                                  <span>Special char</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={signupForm.confirmPassword}
                              onChange={handleSignupChange}
                              placeholder="••••••••••"
                              className="pl-10"
                              required
                            />
                          </div>
                          {signupForm.password && signupForm.confirmPassword && signupForm.password !== signupForm.confirmPassword && (
                            <p className="text-xs text-red-600 mt-1">
                              Passwords do not match
                            </p>
                          )}
                        </div>
                        
                        <Button 
                          type="button"
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          onClick={handleRequestOTP}
                        >
                          Request Verification Code <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                          <div className="flex">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                            <div>
                              <p className="text-green-700 font-medium">Verification code sent!</p>
                              <p className="text-green-600 text-sm">
                                We've sent a 6-digit code to your email and phone number.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Verification Code (OTP)
                          </label>
                          <Input
                            type="text"
                            name="otp"
                            value={signupForm.otp}
                            onChange={handleSignupChange}
                            placeholder="123456"
                            className="text-center tracking-widest font-mono text-lg"
                            maxLength={6}
                            required
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <button 
                            type="button" 
                            className="text-purple-600 hover:text-purple-500"
                            onClick={() => setOtpSent(false)}
                          >
                            Change Details
                          </button>
                          <button 
                            type="button" 
                            className="text-purple-600 hover:text-purple-500"
                          >
                            Resend Code
                          </button>
                        </div>
                        
                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          Create Account
                        </Button>
                      </>
                    )}
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-gray-600">
          By signing in or creating an account, you agree to our{" "}
          <a href="#" className="text-purple-600 hover:text-purple-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-purple-600 hover:text-purple-500">
            Privacy Policy
          </a>.
        </div>
      </div>
    </div>
  );
};

export default SignIn;
