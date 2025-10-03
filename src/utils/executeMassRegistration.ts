import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const executeMassRegistration = async () => {
  try {
    toast.info("🚀 Starting automatic registrations on all platforms...");

    const { data, error } = await supabase.functions.invoke('mass-registration', {
      body: {
        ein_number: '33-3939483'
      }
    });

    if (error) {
      console.error('Error during mass registration:', error);
      toast.error("❌ Automatic registration error");
      return { success: false, error };
    }

    console.log('Mass registration completed:', data);
    toast.success(`✅ ${data.total_platforms} platforms successfully registered!`);
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to execute mass registration:', error);
    toast.error("❌ Failed to execute registrations");
    return { success: false, error };
  }
};

// Execute the mass registration immediately
executeMassRegistration();