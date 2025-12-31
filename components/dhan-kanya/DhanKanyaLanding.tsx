"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Menu,
  X,
  Send,
  Brain,
  MessageCircle,
  Shield,
  IndianRupee,
  Wallet,
  Target,
  TrendingUp,
  PieChart,
  CreditCard,
  Check,
  ChevronDown,
  ArrowUp,
  Link,
  Plus,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar, NavBody, NavItems, MobileNav, MobileNavMenu, MobileNavToggle, NavbarButton } from "@/components/ui/resizable-navbar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  price: string;
  badge: string;
  description: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  highlighted?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const DhanKanyaLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "I earn ₹50k/month. How should I split my budget?",
      sender: "user",
    },
    {
      id: "2",
      text: "Great question! Here's a 50/30/20 split adapted for your income: ₹25k for needs, ₹15k for wants, and ₹10k for savings.",
      sender: "assistant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's a great question! I'm here to help you understand personal finance better...",
        sender: "assistant",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const steps: Step[] = [
    {
      number: "01",
      title: "Tell us your story",
      description:
        "Share your income, expenses, and financial goals. We keep it simple and private.",
    },
    {
      number: "02",
      title: "Chat and learn",
      description:
        "Ask DhanKanya anything about money. No financial jargon—just clear, actionable answers.",
    },
    {
      number: "03",
      title: "Plan and grow",
      description:
        "Get personalized budgets, savings strategies, and reminders to stay on track.",
    },
  ];

  const useCases: UseCase[] = [
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Monthly Budget Builder",
      description:
        "Create a realistic budget for your month in under 2 minutes.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Savings Goal Planner",
      description:
        "Plan for a vacation, new laptop, or emergency fund with clear milestones.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Investment Basics",
      description:
        "Understand mutual funds, SIPs, and stocks without overwhelming finance terms.",
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Expense Tracker Insights",
      description:
        "Analyze your spending patterns and find areas to save.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Debt Payoff Strategy",
      description:
        "Build a plan to pay off loans or credit card debt faster.",
    },
  ];

  const features: Feature[] = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "AI-Powered insights",
      description:
        "Personalized recommendations based on your habits and goals.",
    },
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: "Chat-first experience",
      description:
        "Talk to DhanKanya like a friend, not a robot. No financial jargon.",
    },
    {
      icon: <IndianRupee className="w-10 h-10" />,
      title: "Indian context",
      description:
        "Built for Indian salaries, taxes, and financial products.",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Privacy-focused",
      description:
        "Your data is encrypted. We never sell or share your information.",
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "₹0/month",
      badge: "Free",
      description: "Perfect to get started",
      features: [
        { text: "Unlimited basic chat", included: true },
        { text: "Simple budget templates", included: true },
        { text: "Monthly reports", included: true },
        { text: "Advanced planning tools", included: false },
      ],
      buttonText: "Get started",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: "₹199/month",
      badge: "Coming",
      description: "For serious savers and planners",
      features: [
        { text: "All Starter features", included: true },
        { text: "Advanced insights and forecasting", included: true },
        { text: "Investment recommendations", included: true },
        { text: "Data export (CSV/PDF)", included: true },
        { text: "Priority support", included: true },
      ],
      buttonText: "Notify me",
      buttonVariant: "default",
      highlighted: true,
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "Is DhanKanya a registered financial advisor?",
      answer:
        "No. DhanKanya is an educational tool designed to help you understand personal finance concepts and plan budgets. It's not a substitute for professional financial or investment advice. Always consult a registered advisor for major financial decisions.",
    },
    {
      question: "What data do I need to share?",
      answer:
        "You can start with just your monthly income and a rough expense estimate. The more details you share (savings goals, investments, debt), the better our recommendations. You control what you share.",
    },
    {
      question: "Can I use DhanKanya without connecting my bank account?",
      answer:
        "Yes! You can use DhanKanya without ever sharing bank login details. You can manually enter your income and expenses, or connect (when available) for auto-sync with proper security protocols.",
    },
    {
      question: "Will DhanKanya support regional languages?",
      answer:
        "Yes, we're planning support for Hindi, Tamil, Telugu, Kannada, and other Indian languages in the coming months.",
    },
    {
      question: "Is DhanKanya free?",
      answer:
        "The Starter plan is completely free. We're working on a Pro tier with advanced features. Early adopters will always have great pricing.",
    },
    {
      question: "How is my data secured?",
      answer:
        "Your data is encrypted in transit and at rest. We follow financial industry security standards. You can delete your account and all data anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans selection:bg-[#00ff88]/30 selection:text-white">
      {/* Background Glow Effects - Replicating architech-dev.tech vibe */}
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00a3ff]/20 blur-[120px] rounded-full opacity-60"></div>
      </div>
       <div className="fixed bottom-0 left-0 right-0 h-[300px] pointer-events-none z-0">
        <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00a3ff]/10 blur-[100px] rounded-full opacity-40"></div>
      </div>

      {/* Navbar */}
      <div className="fixed top-0 inset-x-0 z-50">
        <Navbar>
            <NavBody>
                <div className="flex items-center gap-2 cursor-pointer z-50">
                    <div className="w-8 h-8 text-[#f5f5f5] bg-[#222222]/50 border border-[#333333] rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-5 h-5" />
                    </div>
                     <span className="text-sm font-bold text-[#f5f5f5] hidden md:block">DhanKanya</span>
                </div>

                <NavItems 
                    items={[
                        { name: "Home", link: "#home" },
                        { name: "Features", link: "#features" },
                        { name: "Pricing", link: "#pricing" },
                        { name: "FAQ", link: "#faq" },
                        { name: "Contact", link: "#contact" },
                    ]} 
                    onItemClick={() => {}}
                />

                <div className="hidden md:flex items-center gap-2 z-50">
                    <Button variant="ghost" className="text-[#888888] hover:text-[#f5f5f5] hover:bg-[#222222] h-8 px-3 text-xs">
                        SignIn
                    </Button>
                    <NavbarButton className="h-8 px-3 text-xs bg-[#f5f5f5] text-black hover:bg-[#e0e0e0]">
                        SignUp
                    </NavbarButton>
                </div>


            </NavBody>
            
            <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                 {[
                        { name: "Home", link: "#home" },
                        { name: "Features", link: "#features" },
                        { name: "Pricing", link: "#pricing" },
                        { name: "FAQ", link: "#faq" },
                        { name: "Contact", link: "#contact" },
                    ].map((item, idx) => (
                         <a key={idx} href={item.link} onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white">
                             {item.name}
                         </a>
                    ))}
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <Button variant="outline" className="w-full justify-center">SignIn</Button>
                        <Button className="w-full justify-center bg-[#f5f5f5] text-black">SignUp</Button>
                    </div>
            </MobileNavMenu>
        </Navbar>
      </div>

      {/* Hero Section - Centered Architech Style */}
      {/* Hero Section - Centered Architech Style */}
      <section id="home" className="relative pt-[180px] pb-24 px-6 z-10 flex flex-col items-center justify-center min-h-[85vh]">
        {/* Top Badge */}
        <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#333333] hover:border-[#444444] transition-colors cursor-pointer group">
                <span className="bg-[#333333] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full text-[#cccccc] tracking-wider">Feature</span>
                <span className="text-xs text-[#888888] group-hover:text-[#f5f5f5] transition-colors flex items-center gap-1">
                    Smart Budget Planning
                    <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                </span>
            </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] to-[#888888] text-center tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
          Decisions made smarter <br/> with AI assistance.
        </h1>

        {/* Subtext (optional, minimal) */}
        {/* <p className="text-[#666666] mb-8">Chat to start.</p> */}

        {/* Central Chat Interface */}
        <div className="w-full max-w-[800px] relative mt-4">
            {/* Chat Box Container */}
             <div className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-4 shadow-2xl shadow-blue-500/5 relative overflow-hidden group hover:border-[#333333] transition-colors duration-300">
                
                {/* Header (mini) */}
                <div className="flex justify-between items-center mb-4 px-1">
                     <div className="flex items-center gap-2">
                         <span className="text-xs font-medium text-[#666666]">
                             <span className="text-[#00ff88]">SignIn</span> to save progress
                         </span>
                     </div>
                     <span className="text-xs text-[#444444] font-medium border border-[#222222] px-2 py-0.5 rounded-md">PRO PREVIEW</span>
                </div>

                {/* Input Area */}
                <textarea 
                    className="w-full bg-transparent border-none outline-none text-[#f5f5f5] placeholder:text-[#444444] resize-none h-[80px] text-lg font-light px-1"
                    placeholder="Ask, learn, plan and grow your wealth..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-4 border-t border-[#1a1a1a] pt-4">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#444444] hover:text-[#f5f5f5] transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </button>
                         <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#444444] hover:text-[#f5f5f5] transition-colors">
                            <IndianRupee className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] border border-[#222222]">
                            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
                            <span className="text-xs text-[#888888] font-medium">dhan-kanya v1.0</span>
                            <ChevronDown className="w-3 h-3 text-[#444444]" />
                         </div>
                         
                         <button className="w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center text-black hover:bg-[#ffffff] transition-transform hover:scale-105 active:scale-95">
                             <ArrowUp className="w-5 h-5" />
                         </button>
                    </div>
                </div>
             </div>
        </div>

        {/* Suggestion Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-[800px]">
             {[
                 { icon: <Wallet className="w-3.5 h-3.5" />, text: "Monthly Budget" },
                 { icon: <Target className="w-3.5 h-3.5" />, text: "Saving Goals" },
                 { icon: <TrendingUp className="w-3.5 h-3.5" />, text: "Mutual Funds" },
                 { icon: <CreditCard className="w-3.5 h-3.5" />, text: "Debt Management" },
                 { icon: <Shield className="w-3.5 h-3.5" />, text: "Insurance Check" },
             ].map((pill, idx) => (
                 <button key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#222222] hover:border-[#444444] hover:bg-[#161616] transition-all text-xs text-[#888888] group">
                     <span className="text-[#444444] group-hover:text-[#00ff88] transition-colors">{pill.icon}</span>
                     <span>{pill.text}</span>
                 </button>
             ))}
        </div>
      </section>

      {/* Content Sections (Product, Features etc.) - Darkened to match vibe */}
      <div className="relative z-10 bg-[#0a0a0a]/50 backdrop-blur-3xl border-t border-[#222222]">
      
          {/* How It Works Section */}
          <section id="features" className="py-32 px-6">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#f5f5f5] tracking-tight">
                  How it works
                </h2>
                <p className="text-[#666666]">
                  Three simple steps to financial clarity
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] hover:border-[#333333] transition-all duration-300"
                  >
                    <div className="text-5xl font-bold text-[#1f1f1f] mb-6 group-hover:text-[#00ff88] transition-colors duration-300">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-[#f5f5f5]">{step.title}</h3>
                    <p className="text-[#666666] leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-32 px-6 border-t border-[#1a1a1a]">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#f5f5f5] tracking-tight">
                  Pricing
                </h2>
                <p className="text-[#666666]">
                  Start free, upgrade when you're ready
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                {pricingTiers.map((tier, index) => (
                  <Card
                    key={index}
                    className={`bg-[#0f0f0f] border-[#1f1f1f] p-8 rounded-2xl shadow-none flex flex-col h-full ${
                        tier.highlighted ? "border-[#00ff88]/30 bg-[#00ff88]/5" : ""
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-[#f5f5f5]">{tier.name}</h3>
                    <div className="text-4xl font-bold mb-2 text-[#f5f5f5]">{tier.price}</div>
                    <p className="text-[#666666] mb-8 text-sm">{tier.description}</p>

                    <div className="space-y-4 mb-10 flex-1">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {feature.included ? (
                            <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-[#00ff88]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-[#222222] flex items-center justify-center flex-shrink-0">
                                 <X className="w-3 h-3 text-[#444444]" />
                            </div>
                          )}
                          <span
                            className={`text-sm ${
                              feature.included ? "text-[#cccccc]" : "text-[#444444]"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant={tier.buttonVariant}
                      className={
                        tier.buttonVariant === "default"
                          ? "bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#e0e0e0] w-full mt-auto"
                          : "border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 w-full mt-auto"
                      }
                    >
                      {tier.buttonText}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-32 px-6 border-t border-[#1a1a1a]">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#f5f5f5] tracking-tight">
                  FAQ
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-[#1f1f1f] bg-[#0f0f0f] rounded-xl px-6 data-[state=open]:border-[#333333]"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6 text-[#f5f5f5] text-sm font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#888888] pb-6 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Footer - Minimal */}
          <footer id="contact" className="py-12 px-6 border-t border-[#1a1a1a] bg-[#050505] text-center">
             <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
                <IndianRupee className="w-5 h-5" />
                <span className="font-bold tracking-tight">DhanKanya</span>
             </div>
             <p className="text-xs text-[#444444]">© 2025 DhanKanya. All rights reserved.</p>
          </footer>
      </div>
    </div>
  );
};

export default DhanKanyaLanding;
