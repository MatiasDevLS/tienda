using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class AppUserRole : IdentityUserRole<int>
    {
        public Usuario User { get; set; }
        public AppRole Role { get; set; }
    }
}