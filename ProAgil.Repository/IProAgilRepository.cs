using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        // GERAL
        void Add<T>(T entity) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        void DeleteRange<T>(T[] entityArray) where T : class;
        Task<bool> SaveChangesAsync();  

        Task<Evento[]> GetAllEventosAsync(bool includePalestrante);

        Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrante);

        Task<Evento> GetEventoAsyncById(int eventoId, bool includePalestrante);

        Task<Palestrante[]> GetAllPalestrantesAsyncByname(string name, bool includeEvento);

        Task<Palestrante> GetPalestranteAsyncById(int palestranteId, bool includeEvento);
    }
}