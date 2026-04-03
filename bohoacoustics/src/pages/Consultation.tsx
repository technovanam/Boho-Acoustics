import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { functions } from "@/lib/firebase";
import { httpsCallable } from "firebase/functions";

const Consultation = () => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [facilityType, setFacilityType] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 700 * 1024) {
      toast.error("FILE TOO LARGE FOR FIRESTORE. PLEASE KEEP IT UNDER 700KB.");
      e.target.value = "";
      return;
    }
    setSelectedFile(file || null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      contact: formData.get("contact"),
      city: formData.get("city"),
      state: formData.get("state"),
      facilityType,
      area: formData.get("area"),
      notes: formData.get("notes"),
      fileBase64: "",
      fileName: selectedFile?.name || "",
    };

    try {
      if (selectedFile) {
        data.fileBase64 = await fileToBase64(selectedFile);
      }

      const submitConsultation = httpsCallable(functions, "submitConsultation");
      await submitConsultation(data);
      
      toast.success("TECHNICAL REQUEST RECEIVED. WE WILL RESPOND SHORTLY.");
      form.reset();
      setSelectedFile(null);
      setFacilityType("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("ERROR SUBMITTING REQUEST. PLEASE TRY AGAIN.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="mb-16 lg:mb-24">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-primary"></span>
              <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">DIAGNOSTIC INTAKE</p>
            </div>
            <h1 className="font-display text-4xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tighter  mb-6">
              Request Space <br />
              <span className="text-primary italic font-light">Analysis</span>
            </h1>
            <p className="text-white/60 text-sm lg:text-base font-light leading-relaxed max-w-xl">
              Submit your project specifications below. Our engineering team will review your requirements and provide a preliminary acoustic assessment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="border border-white/10 p-8 lg:p-12 relative overflow-hidden bg-black group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px]" />
            <div className="relative z-10 space-y-8">

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                  <span className="text-[10px] font-black text-white/40 tracking-widest">01</span>
                  <h3 className="text-white text-xs tracking-[0.2em] font-bold uppercase">Client Specifications</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">Full Name</label>
                    <Input name="name" required placeholder="JOHN DOE" className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white placeholder:text-white/20 uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">Email Address</label>
                    <Input type="email" name="email" required placeholder="YOU@DOMAIN.COM" className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white placeholder:text-white/20 uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-6">
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">Contact Number</label>
                    <Input name="contact" required placeholder="PHONE NUMBER" className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white placeholder:text-white/20 uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">City / Area</label>
                    <Input name="city" required placeholder="E.G. BANDRA, MUMBAI" className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white placeholder:text-white/20 uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">State</label>
                    <Input name="state" required placeholder="E.G. MAHARASHTRA" className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white placeholder:text-white/20 uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-white/5 mt-12">
                  <span className="text-[10px] font-black text-white/40 tracking-widest">02</span>
                  <h3 className="text-white text-xs tracking-[0.2em] font-bold uppercase">Project Parameters</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">Facility Type</label>
                    <Select value={facilityType} onValueChange={setFacilityType} required>
                      <SelectTrigger className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white uppercase text-xs tracking-widest focus:ring-1 focus:ring-primary focus:border-primary transition-all">
                        <SelectValue placeholder="SELECT ENVIRONMENT" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10 rounded-none">
                        <SelectItem value="home-theatre" className="text-xs uppercase tracking-widest focus:bg-white/5 focus:text-primary rounded-none">Home Theatre</SelectItem>
                        <SelectItem value="office" className="text-xs uppercase tracking-widest focus:bg-white/5 focus:text-primary rounded-none">Office / Commercial</SelectItem>
                        <SelectItem value="auditorium" className="text-xs uppercase tracking-widest focus:bg-white/5 focus:text-primary rounded-none">Auditorium</SelectItem>
                        <SelectItem value="residential" className="text-xs uppercase tracking-widest focus:bg-white/5 focus:text-primary rounded-none">Residential Core</SelectItem>
                        <SelectItem value="studio" className="text-xs uppercase tracking-widest focus:bg-white/5 focus:text-primary rounded-none">Recording Studio</SelectItem>
                        <SelectItem value="other" className="text-xs uppercase tracking-widest focus:bg-white/5 focus:text-primary rounded-none">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="facilityType" value={facilityType} />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">Floor Area (SQ FT)</label>
                    <Input name="area" placeholder="TOTAL AREA" className="bg-white/[0.02] border-white/10 rounded-none h-14 text-white placeholder:text-white/20 uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-white/5 mt-12">
                  <span className="text-[10px] font-black text-white/40 tracking-widest">03</span>
                  <h3 className="text-white text-xs tracking-[0.2em] font-bold uppercase">Technical Documentation</h3>
                </div>

                <div>
                  <label htmlFor="consultation-file-upload" className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">
                    Upload Floor Plans (Optional)
                  </label>
                  <input
                    id="consultation-file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <div className="flex items-center border border-white/10 bg-white/[0.02] h-14 group-hover:border-white/20 transition-colors">
                    <label
                      htmlFor="consultation-file-upload"
                      className="h-full flex items-center justify-center gap-3 border-r border-white/10 bg-white/5 px-6 cursor-pointer hover:text-primary hover:bg-white/10 transition-colors uppercase text-[10px] font-bold tracking-widest"
                    >
                      <Upload className="w-4 h-4" /> BROWSE
                    </label>
                    <span className="px-6 text-xs text-white/60 uppercase tracking-widest truncate">
                      {selectedFile ? selectedFile.name : "No file selected"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase mb-3 block">Diagnostic Notes</label>
                  <Textarea name="notes" placeholder="DESCRIBE THE ACOUSTIC ISSUES (E.G., ECHO, REVERBERATION, SOUND BLEED)..." className="bg-white/[0.02] border-white/10 rounded-none min-h-[120px] text-white placeholder:text-white/20 uppercase text-xs tracking-widest p-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" />
                </div>
              </div>

              <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[9px] text-white/50 tracking-[0.2em] uppercase font-bold text-center sm:text-left">
                  ALL DATA REMAINS STRICTLY CONFIDENTIAL.
                </p>

                <Button
                  type="submit"
                  className="gradient-gold text-primary-foreground font-black text-xs tracking-widest px-8 md:px-12 h-14 md:h-16 rounded-none hover:translate-x-2 transition-transform uppercase w-full sm:w-auto"
                  disabled={submitting}
                >
                  {submitting ? "SUBMITTING..." : "INITIATE DIAGNOSTIC"}
                  {!submitting && <ArrowRight className="ml-4 w-5 h-5" />}
                </Button>
              </div>

            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
