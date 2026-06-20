import torch
import gc

def offload_to_cpu(model, model_name="Model"):
    """
    Moves a PyTorch model to the CPU and aggressively clears the GPU cache.
    Use this immediately after generating your embeddings.
    """
    print(f"Offloading {model_name} to CPU...")
    
    # 1. Move the model weights to System RAM (CPU)
    if model is not None:
        model.to("cpu")
    
    # 2. Force Python to clean up any unreferenced variables
    gc.collect()
    
    # 3. Empty the PyTorch CUDA allocator cache (This actually drops the VRAM usage)
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        torch.cuda.ipc_collect()
        
    print(f"{model_name} offloaded successfully.")

def check_vram(step_name="Current State"):
    """
    Helper function to verify that your VRAM actually dropped.
    Call this before and after offloading to prove to Vijay that it works!
    """
    if not torch.cuda.is_available():
        print("CUDA is not available. Running on CPU.")
        return

    # Convert bytes to Gigabytes for easier reading
    allocated = torch.cuda.memory_allocated() / (1024 ** 3)
    reserved = torch.cuda.memory_reserved() / (1024 ** 3)
    
    print(f"--- VRAM check: {step_name} ---")
    print(f"Allocated: {allocated:.2f} GB (Actual memory holding weights/tensors)")
    print(f"Reserved:  {reserved:.2f} GB (Memory PyTorch is hoarding)")
    print("-" * 30)