cache [controller_name, action_name, site] do
  xml.instruct!
  xml.urlset( {"xmlns" => 'http://www.sitemaps.org/schemas/sitemap/0.9', 
              "xmlns:xsi" => 'http://www.w3.org/2001/XMLSchema-instance', 
              "xsi:schemaLocation" => 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
              "xmlns:xhtml" => "http://www.w3.org/1999/xhtml"}) do
                
    site.available_locales.each do |language|
      @other_locales = site.available_locales.reject {|e| e = language}
       xml.url do
         xml.loc "#{root_url(:locale => language.code)}"
         @other_locales.each do |l|
           unless alternate_url = root_url(:locale => l)
             xml.xhtml(:link, :rel => 'alternate', :hreflang => l.to_s, :href => alternate_url)
           end
         end
         xml.lastmod site.updated_at.to_date
         xml.priority 1
       end
    end
  end
end


