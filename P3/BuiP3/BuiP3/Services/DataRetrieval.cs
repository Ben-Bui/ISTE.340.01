using System.Net.Http.Headers;

namespace BuiP3.Services
{
    public class DataRetrieval
    {
        //Task vs Tread
        /*Task has async/await and a return value!
         * (no direct way to return from a thread)
         * task can do multiple thing at once, thread can do one
         * can cancel a task
         * Task is a higher level concept than a thread
         */

        //d is something like 'about' or 'people/' - the endpoint 
        public async Task<string> GetData(string d)
        {
            //using statement - at the end of it automatically calls dispose method 
            using (var client = new HttpClient())
            { 
                //setup
                client.BaseAddress = new Uri("https://ischool.gccis.rit.edu/api/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //try/catch
                try
                {
                    HttpResponseMessage res = await client.GetAsync(d, HttpCompletionOption.ResponseHeadersRead);
                    res.EnsureSuccessStatusCode();
                    //go get it
                    var data = await res.Content.ReadAsStringAsync();
                    //at this point, data is just a string..
                    return data;

                }
                catch (HttpRequestException hre) 
                {
                    var msg = hre.Message;
                    return "HttpReq: " + msg;
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                    return "Ex: " + msg;
                }

            }

        }
    }
}
