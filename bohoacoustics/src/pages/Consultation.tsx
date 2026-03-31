import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Consultation = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you! We'll get back to you within 24 hours.");
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <SectionReveal>
            <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium text-center mb-4">Free Consultation</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-center mb-4">
              Get a Custom <span className="gradient-gold-text">Acoustic Plan</span>
            </h1>
            <p className="text-muted-foreground text-center mb-12">
              Tell us about your space and we'll design the perfect acoustic solution. No obligation.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 lg:p-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Name *</label>
                  <Input required placeholder="Your full name" className="bg-secondary border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone / Email *</label>
                  <Input required placeholder="How to reach you" className="bg-secondary border-border" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Project Type *</label>
                <Select required>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-theatre">Home Theatre</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="auditorium">Auditorium</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Area (sq ft)</label>
                  <Input placeholder="e.g. 500" className="bg-secondary border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <Input placeholder="City, State" className="bg-secondary border-border" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Budget Range (Optional)</label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1l">Under ₹1 Lakh</SelectItem>
                    <SelectItem value="1-3l">₹1 - 3 Lakhs</SelectItem>
                    <SelectItem value="3-5l">₹3 - 5 Lakhs</SelectItem>
                    <SelectItem value="5-10l">₹5 - 10 Lakhs</SelectItem>
                    <SelectItem value="above-10l">Above ₹10 Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tell us about your space</label>
                <Textarea placeholder="Describe your acoustic challenges, goals, or any specific requirements..." className="bg-secondary border-border min-h-[100px]" />
              </div>

              <Button
                type="submit"
                size="lg"
                className="gradient-gold text-primary-foreground font-semibold w-full hover:opacity-90 transition-opacity"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Get Custom Acoustic Plan"}
                {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Free consultation. No obligation. We respond within 24 hours.
              </p>
            </form>
          </SectionReveal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Consultation;
