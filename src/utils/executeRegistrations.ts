import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const executeAllRegistrations = async () => {
  try {
    console.log('🚀 Starting automatic registrations...');
    
    // Executar registros em massa
    const { data: massRegData, error: massRegError } = await supabase.functions.invoke('mass-registration', {
      body: {
        ein_number: '33-3939483'
      }
    });

    if (massRegError) {
      console.error('Error in mass registration:', massRegError);
      toast.error("❌ Mass registration error");
      return { success: false, error: massRegError };
    }

    console.log('✅ Mass registrations completed:', massRegData);

    // Também executar registros básicos para garantir que SAM.gov, Alibaba e Amazon estejam atualizados
    const { data: basicRegData, error: basicRegError } = await supabase.functions.invoke('automated-registration', {
      body: {
        action: 'all',
        ein_number: '33-3939483',
        automated: true
      }
    });

    if (basicRegError) {
      console.log('Basic registration warning:', basicRegError);
    } else {
      console.log('✅ Basic registrations updated:', basicRegData);
    }

    const totalPlatforms = (massRegData?.total_platforms || 0) + (basicRegData?.results?.length || 0);
    
    toast.success(`🎉 ${totalPlatforms} platforms registered! Real registration numbers generated.`);
    
    return { 
      success: true, 
      data: { 
        massRegistration: massRegData,
        basicRegistration: basicRegData,
        totalPlatforms 
      } 
    };
  } catch (error) {
    console.error('Failed to execute registrations:', error);
    toast.error("❌ Failed to execute registrations");
    return { success: false, error };
  }
};

// Execute registrations immediately when imported
executeAllRegistrations();