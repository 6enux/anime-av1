class Provider {
    private baseUrl = "https://animeav1.com";
    private headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "es-ES,es;q=0.9",
        "Referer": "https://animeav1.com/",
    };

    getSettings(): Settings {
        return {
            episodeServers: ["HLS", "MP4Upload"],
            supportsDub: true
        };
    }

    async search(opts: SearchOptions): Promise<SearchResult[]> {
        try {
            const query = encodeURIComponent(opts.query || opts.media?.romajiTitle || opts.media?.englishTitle || "");
            const url = `${this.baseUrl}/catalogo/__data.json?search=${query}&page=1`;
            
            const res = await fetch(url, { headers: this.headers });
            if (!res.ok) return [];

            const json = res.json();
            // Aquí hay que parsear el formato de SvelteKit (nodes + data array con punteros)
            // Te ayudo a ajustar esta parte cuando veamos la respuesta real

            const results: SearchResult[] = [];
            // ... lógica de extracción de resultados

            return results;
        } catch (e) {
            console.error("Search error:", e);
            return [];
        }
    }

    async findEpisodes(id: string): Promise<EpisodeDetails[]> {
        // id normalmente es el slug o un JSON {slug, type}
        let slug = id;
        try {
            const parsed = JSON.parse(id);
            slug = parsed.slug || id;
        } catch {}

        const url = `${this.baseUrl}/media/${slug}/__data.json`;
        const res = await fetch(url, { headers: this.headers });
        // ... parsear episodios
        return [];
    }

    async findEpisodeServer(episode: EpisodeDetails, server: string): Promise<EpisodeServer> {
        // Extraer streams (HLS prioritario)
        return {
            server: server || "HLS",
            headers: {
                "Referer": "https://player.zilla-networks.com/",
                "User-Agent": this.headers["User-Agent"]
            },
            videoSources: []
        };
    }
}