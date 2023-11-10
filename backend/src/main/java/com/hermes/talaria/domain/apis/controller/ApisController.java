package com.hermes.talaria.domain.apis.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hermes.talaria.domain.apis.dto.ApisDto;
import com.hermes.talaria.domain.apis.dto.ApisRequest;
import com.hermes.talaria.domain.apis.dto.ApisResponse;
import com.hermes.talaria.domain.apis.dto.OasRequest;
import com.hermes.talaria.domain.apis.service.ApisService;
import com.hermes.talaria.global.memberinfo.MemberInfo;
import com.hermes.talaria.global.util.ModelMapperUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
public class ApisController {

	private final ApisService apisService;

	@PostMapping("/developer")
	public ResponseEntity<ApisResponse> create(@MemberInfo Long memberId, @RequestBody ApisRequest request) {
		ApisDto apisDto = ModelMapperUtil.getModelMapper().map(request, ApisDto.class);
		apisDto.setDeveloperId(memberId);
		ApisResponse response = ApisResponse.ofApisId(apisService.create(apisDto));

		return ResponseEntity.ok().body(response);
	}

	@GetMapping("/developer")
	public ResponseEntity<List<ApisResponse>> findApis(@MemberInfo Long memberId) {
		List<ApisResponse> response = apisService.findApisByDeveloperId(memberId).stream()
			.map(apisDto -> ModelMapperUtil.getModelMapper().map(apisDto, ApisResponse.class))
			.collect(Collectors.toList());

		return ResponseEntity.ok().body(response);
	}

	@PatchMapping("/developer/{apisId}")
	public ResponseEntity<ApisResponse> update(@MemberInfo Long memberId, @RequestParam Long apisId,
		@RequestBody ApisRequest request) {
		ApisDto apisDto = ModelMapperUtil.getModelMapper().map(request, ApisDto.class);
		apisDto.setApisId(apisId);
		apisDto.setDeveloperId(memberId);
		ApisResponse response = ApisResponse.ofApisId(apisService.update(apisDto));

		return ResponseEntity.ok().body(response);
	}

	@DeleteMapping("/developer/{apisId}")
	public ResponseEntity<ApisResponse> delete(@MemberInfo Long memberId, @RequestParam Long apisId) {
		ApisResponse response = ApisResponse.ofApisId(apisService.delete(memberId, apisId));

		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/developer/oas/{apisId}")
	public ResponseEntity<ApisResponse> registerOas(@MemberInfo Long memberId, @RequestParam Long apisId,
		@RequestBody OasRequest request) {
		ApisDto apisDto = ModelMapperUtil.getModelMapper().map(request, ApisDto.class);
		apisDto.setApisId(apisId);
		apisDto.setDeveloperId(memberId);
		ApisResponse response = ApisResponse.ofApisId(apisService.registerOas(apisDto));

		return ResponseEntity.ok().body(response);
	}

}