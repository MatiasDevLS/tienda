using CloudinaryDotNet.Actions;

namespace Api.Interfaces
{
    public interface IFotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}