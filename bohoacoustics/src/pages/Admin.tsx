import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, LogOut, CheckCircle } from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  contact: string;
  city: string;
  state: string;
  facilityType: string;
  area: string;
  notes: string;
  fileBase64: string;
  fileName: string;
  timestamp: any;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "consultations"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: Consultation[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() } as Consultation);
      });
      setConsultations(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("LOGIN DETECTED. AUTHORIZED.");
    } catch (error: any) {
      toast.error("UNAUTHORIZED: INVALID CREDENTIALS.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast("SESSION TERMINATED.");
  };

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primary font-bold tracking-widest text-xs uppercase">INITIALIZING SYSTEM...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm border border-white/10 bg-black p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-[1px] bg-primary"></span>
            <h1 className="text-white text-[10px] tracking-[0.4em] uppercase font-bold">ADMIN PORTAL</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-3 block">ACCESS ID (EMAIL)</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="bg-white/[0.02] border-white/10 rounded-none h-12 text-white uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-3 block">SECURITY KEY (PASSWORD)</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="bg-white/[0.02] border-white/10 rounded-none h-12 text-white text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all" 
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-none gradient-gold text-primary-foreground font-black text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all">
              AUTHENTICATE
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 border-b border-white/10 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-[1px] bg-primary"></span>
              <h1 className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">CONTROL CENTER</h1>
            </div>
            <h2 className="font-display text-3xl font-black uppercase tracking-tight">Diagnostic Intake Logs</h2>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-white/10 rounded-none hover:bg-white/5 hover:text-white h-10 tracking-widest text-[10px] uppercase font-bold">
            <LogOut className="w-3 h-3 mr-2" /> DISCONNECT
          </Button>
        </header>

        {consultations.length === 0 ? (
          <div className="text-center py-24 border border-white/5 bg-white/[0.01]">
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase">NO DIAGNOSTIC LOGS FOUND IN DATABASE.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {consultations.map((req, index) => (
              <div key={req.id} className="border border-white/10 bg-black p-6 hover:border-white/20 transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-white/20 tracking-widest">#{index + 1}</span>
                    <h3 className="text-xl font-bold uppercase tracking-wide">{req.name}</h3>
                    <span className="text-[9px] px-2 py-1 bg-white/5 text-white/40 border border-white/10 uppercase tracking-widest">
                      {req.timestamp?.toDate ? new Date(req.timestamp.toDate()).toLocaleDateString() : "JUST NOW"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
                    <div>
                      <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-1">Contact</p>
                      <p className="text-xs uppercase tracking-wide text-white/80">{req.contact || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-1">Location</p>
                      <p className="text-xs uppercase tracking-wide text-white/80">{req.city}, {req.state}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-1">Facility Target</p>
                      <p className="text-xs uppercase tracking-wide text-white/80">{req.facilityType || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-1">Volume (SQ FT)</p>
                      <p className="text-xs uppercase tracking-wide text-white/80">{req.area || "N/A"}</p>
                    </div>
                  </div>

                  {req.notes && (
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-2">Subjective Analysis Notes</p>
                      <p className="text-sm font-light leading-relaxed text-white/60">{req.notes}</p>
                    </div>
                  )}
                </div>

                <div className="md:w-64 border-l border-white/10 md:pl-8 flex flex-col justify-center gap-4">
                  {req.fileBase64 ? (
                    <div className="space-y-2">
                       <p className="text-[8px] text-white/30 uppercase tracking-widest truncate">{req.fileName || "ATTACHED FILE"}</p>
                       <a href={req.fileBase64} download={req.fileName || "attachment"} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full h-12 rounded-none bg-white/5 border border-white/10 text-white font-bold text-[10px] tracking-widest hover:bg-white/10 transition-colors uppercase">
                          <FileText className="w-3 h-3 mr-2 text-primary" /> DOWNLOAD FILE
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="w-full h-12 flex items-center justify-center border border-dashed border-white/10 text-[9px] text-white/30 font-bold uppercase tracking-widest">
                      NO ATTACHMENT
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full h-12 rounded-none border-white/10 text-white/50 hover:bg-white/5 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-colors">
                    <CheckCircle className="w-3 h-3 mr-2" /> MARK PROCESSED
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
