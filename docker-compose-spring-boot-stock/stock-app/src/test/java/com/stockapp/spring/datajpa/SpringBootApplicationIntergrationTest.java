package com.stockapp.spring.datajpa;

import java.nio.charset.Charset;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.stockapp.spring.datajpa.model.Stock;
import com.stockapp.spring.datajpa.repository.StockRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class SpringBootApplicationIntergrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private StockRepository stockRepository;

	public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	@Test
	public void givenStocks_whenGetStocks_thenStatus200() throws Exception {
		// given - setup or precondition
		Stock stock = new Stock("ICICI", 200);
		stock = stockRepository.save(stock);

		// when - action
		ResultActions response = mockMvc
				.perform(MockMvcRequestBuilders.get("/api/stocks?currentPage=0&stocksPerPage=1"));
		response.andExpect(MockMvcResultMatchers.status().isOk());

		// cleanup
		stockRepository.delete(stock);
	}

	@Test
	public void givenStocks_whenAddStocks_thenStatus204() throws Exception {
		// given - setup or precondition
		Stock stock = new Stock("ICICI", 200);
		stock = stockRepository.save(stock);
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
		String requestJson = ow.writeValueAsString(stock);

		// when - action
		ResultActions response = mockMvc.perform(
				MockMvcRequestBuilders.post("/api/stocks").contentType(APPLICATION_JSON_UTF8).content(requestJson));

		response.andExpect(MockMvcResultMatchers.status().isNoContent());
		// String output = response.andReturn().getResponse().getContentAsString();

		// cleanup
		stockRepository.delete(stock);
	}

	@Test
	public void givenStocks_whenAddStocks_thenStatus201() throws Exception {
		// given - setup or precondition
		Stock stock = new Stock("ICICI", 200);
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
		String requestJson = ow.writeValueAsString(stock);

		// when - action
		ResultActions response = mockMvc.perform(
				MockMvcRequestBuilders.post("/api/stocks").contentType(APPLICATION_JSON_UTF8).content(requestJson));

		response.andExpect(MockMvcResultMatchers.status().isCreated());
		String output = response.andReturn().getResponse().getContentAsString();
		Stock outputStock = mapper.readValue(output, Stock.class);

		// cleanup
		stockRepository.delete(outputStock);
	}

	@Test
	public void givenStocks_whenGetStockById_thenStatus200() throws Exception {
		// given - setup or precondition
		Stock stock = new Stock("SEC", 200);
		stock = stockRepository.save(stock);

		// when - action
		ResultActions response = mockMvc
				.perform(MockMvcRequestBuilders.get("/api/stocks/"+stock.getId()));
		response.andExpect(MockMvcResultMatchers.status().isOk());

		// cleanup
		stockRepository.delete(stock);
	}

	@Test
	public void givenStocks_whenPatchAmount_thenStatus200() throws Exception {
		// given - setup or precondition
		Stock stock = new Stock("BCG", 200);
		// Stock stock = new Stock("SEC", 200);
		stock = stockRepository.save(stock);
		stock.setCurrentPrice(300);
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
		ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
		String requestJson = ow.writeValueAsString(stock);

		// when - action
		ResultActions response = mockMvc.perform(
				MockMvcRequestBuilders.patch("/api/stocks/"+ stock.getId())
				.contentType(APPLICATION_JSON_UTF8)
				.content(requestJson));

		response.andExpect(MockMvcResultMatchers.status().isOk());
		String output = response.andReturn().getResponse().getContentAsString();
		Stock outputStock = mapper.readValue(output, Stock.class);

		// cleanup
		stockRepository.delete(outputStock);
	}


	@Test
	public void givenStocks_whenDeleteStock_thenStatus200() throws Exception {
		// given - setup or precondition
		Stock stock = new Stock("BCG", 200);
		stock = stockRepository.save(stock);
		
		// when - action
		ResultActions response = mockMvc.perform(
				MockMvcRequestBuilders.delete("/api/stocks/"+ stock.getId()));
		response.andExpect(MockMvcResultMatchers.status().isOk());
	}

}
